import db from '../db/data';
import { convertCurrency } from './useExchangeRates';

const revertAmount = async (transactionData, rates) => {
  // Update the account balance
  if (transactionData.type !== 'transfer') {
    // add and remove money from account if its expense or income
    await db.accounts
      .where('id')
      .equals(transactionData.accountTransactionInfo[0]?.id)
      .modify((account) => {
        const currency = account.currencies.find(
          (cur) => cur.code === transactionData.accountTransactionInfo[0]?.code
        );

        if (!currency) return;

        transactionData.type === 'expense'
          ? (currency.amount +=
              transactionData.accountTransactionInfo[0]?.amount)
          : (currency.amount -=
              transactionData.accountTransactionInfo[0]?.amount);
      });
  } else {
    // transfer amount from one amount to another amount

    // add to second account
    await db.accounts
      .where('id')
      .equals(transactionData.accountTransactionInfo[0]?.id)
      .modify((account) => {
        const currency = account.currencies.find(
          (cur) => cur.code === transactionData.accountTransactionInfo[0]?.code
        );

        if (currency)
          currency.amount += transactionData.accountTransactionInfo[0]?.amount;
      });

    // subtract from first account
    await db.accounts
      .where('id')
      .equals(transactionData.accountTransactionInfo[1]?.id)
      .modify((account) => {
        const currency = account.currencies.find(
          (cur) => cur.code === transactionData.accountTransactionInfo[1]?.code
        );

        if (currency)
          currency.amount -= convertCurrency(
            transactionData.accountTransactionInfo[0]?.amount,
            transactionData?.accountTransactionInfo[0]?.code,
            transactionData?.accountTransactionInfo[1]?.code,
            rates
          );
      });
  }
};

// remove or add amount to account as saved transaction

const updateAccountAmount = async (transactionData, rates) => {
  // remove or add amount to account as saved transaction

  // Update the account balance
  if (transactionData.type !== 'transfer') {
    // add and remove money from account if its expense or income
    await db.accounts
      .where('id')
      .equals(transactionData.firstAccountInfo?.id)
      .modify((account) => {
        const currency = account.currencies.find(
          (cur) => cur.code === transactionData.firstAccountCode
        );

        if (!currency) return;

        transactionData.type === 'expense'
          ? (currency.amount -= transactionData.firstAccountAmount)
          : (currency.amount += transactionData.firstAccountAmount);
      });
  } else {
    // transfer amount from one amount to another amount

    // subtract from first account
    await db.accounts
      .where('id')
      .equals(transactionData.firstAccountInfo?.id)
      .modify((account) => {
        const currency = account.currencies.find(
          (cur) => cur.code === transactionData.firstAccountCode
        );

        if (currency) currency.amount -= transactionData.firstAccountAmount;
      });

    // add to second account
    await db.accounts
      .where('id')
      .equals(transactionData.secondAccountInfo?.id)
      .modify((account) => {
        const currency = account.currencies.find(
          (cur) => cur.code === transactionData.secondAccountCode
        );

        if (currency)
          currency.amount += convertCurrency(
            transactionData.firstAccountAmount,
            transactionData?.firstAccountCode,
            transactionData?.secondAccountCode,
            rates
          );
      });
  }
};

const useSaveAccount = async (account) => {
  // save account to db itself
  const accountId = await db.accounts.add({
    name: account.name,
    showOnDashboard: account.showOnDashboard,
    type: account.type,
    currencies: account.currencies,
    isArchived: false,
  });

  return accountId;
};

const useUpdateAccount = async (account) => {
  // save account to db itself
  const updated = await db.accounts.update(account.id, {
    name: account.name,
    showOnDashboard: account.showOnDashboard,
    type: account.type,
    currencies: account.currencies,
  });

  if (updated === 0) console.error('No account found with that id');
};

const useSaveTransactions = async (transactionData, rates) => {
  // for  account and amount that use for debit expense or add income

  const firstAccountTransaction = {
    id: transactionData.firstAccountInfo?.id,
    amount: transactionData.firstAccountAmount,
    code: transactionData.firstAccountCode,
  };

  // for  account and amount that use receive amount from transfer
  const secondAccountTransaction = {
    id: transactionData?.secondAccountInfo.id,
    amount: transactionData?.secondAccountAmount,
    code: transactionData?.secondAccountCode,
  };

  const accountTransactionInfo =
    transactionData.type !== 'transfer'
      ? [firstAccountTransaction]
      : [firstAccountTransaction, secondAccountTransaction];

  await updateAccountAmount(transactionData, rates);
  // save transaction to db itself
  const transactionsId = await db.transactions.add({
    type: transactionData.type,

    // add accountTransactions info

    accountTransactionInfo,

    // add note and date for transactions
    note: transactionData.note,
    date: transactionData.date,

    // add tags for transactions
    tags: transactionData.tag,
  });

  for (const tag of transactionData.tag) {
    try {
      await db.tags.add({ tag });
    } catch (error) {
      error.name === 'ConstraintError'
        ? null
        : console.error('Error saving tag', error);
    }
  }
  return transactionsId;
};

// delete  transaction from  database

const deleteTransactions = async (transactionData, rates) => {
  // Update the account balance
  await revertAmount(transactionData, rates);
  // //delete transaction from  database
  await db.transactions.delete(transactionData.id);
};

// edit transaction and accounts
const updateTransactions = async (transactionData, newData, rates) => {
  // Update the account balance
  await revertAmount(transactionData, rates);
  //

  await updateAccountAmount(newData, rates);

  // for  account and amount that use for debit expense or add income

  const firstAccountTransaction = {
    id: newData.firstAccountInfo?.id,
    amount: newData.firstAccountAmount,
    code: newData.firstAccountCode,
  };

  // for  account and amount that use receive amount from transfer
  const secondAccountTransaction = {
    id: newData?.secondAccountInfo.id,
    amount: newData?.secondAccountAmount,
    code: newData?.secondAccountCode,
  };

  const accountTransactionInfo =
    newData.type !== 'transfer'
      ? [firstAccountTransaction]
      : [firstAccountTransaction, secondAccountTransaction];

  for (const tag of newData.tag) {
    try {
      await db.tags.add({ tag });
    } catch (error) {
      error.name === 'ConstraintError'
        ? null
        : console.error('Error saving tag', error);
    }
  }

  await db.transactions.update(transactionData.id, {
    type: newData.type,

    // add accountTransactions info

    accountTransactionInfo,

    // add note and date for transactions
    note: newData.note,
    date: newData.date,

    // add tags for transactions
    tags: newData.tag,
    updateAt: new Date().toISOString(),
  });
};

//
const useDeleteAccount = async (
  deleteOption,
  accountId,
  moveToAccount,
  rates
) => {
  // delete or archive an account in db
  const transaction = await db.transactions.toArray();
  const filterTransaction = transaction.filter(
    (list) =>
      list.accountTransactionInfo[0].id === accountId ||
      list.accountTransactionInfo[1]?.id === accountId
  );

  if (deleteOption === 'archive') {
    await db.accounts.update(accountId, { isArchived: true });
  } else if (deleteOption === 'move') {
    const targetAccount = await db.accounts.get(moveToAccount.id);
    const updateAccountCurrencies = targetAccount.currencies;
    //

    for (const tx of filterTransaction) {
      const txCurrencyCode = tx.accountTransactionInfo.find(
        (acc) => acc.id === accountId
      );
      const exist = updateAccountCurrencies.find(
        (c) => c.code === txCurrencyCode.code
      );

      if (!exist) {
        updateAccountCurrencies.push({
          code: txCurrencyCode.code,
          enabled: true,
          amount: 0,
        });
      }
    }

    //
    await db.accounts.update(moveToAccount.id, {
      currencies: updateAccountCurrencies,
    });

    //
    if (filterTransaction.length > 0) {
      filterTransaction.forEach((li) => {
        updateTransactions(
          li,
          {
            type: li.type,
            firstAccountInfo: moveToAccount,
            firstAccountCode: li.accountTransactionInfo[0]?.code,
            firstAccountAmount: li.accountTransactionInfo[0]?.amount,
            secondAccountInfo: moveToAccount,
            secondAccountAmount: li.accountTransactionInfo[0]?.amount,
            secondAccountCode: li.accountTransactionInfo[0]?.code,
            note: li.note,
            date: li.date,
            tag: li.tags,
          },
          rates
        );
      });
    }

    //
    await db.accounts.delete(accountId);
  } else {
    filterTransaction.forEach((li) => deleteTransactions(li, rates));
    await db.accounts.delete(accountId);
  }
};

//
const deleteUserData = async () => {
  // delete entire database
  await db.delete();

  //  reopen database

  await db.open();

  window.location.reload();
};

export {
  useSaveAccount,
  useSaveTransactions,
  deleteTransactions,
  updateTransactions,
  useUpdateAccount,
  useDeleteAccount,
  deleteUserData,
};
