import db from '../db/data';

const useSaveAccount = async (account) => {
  // save account to db itself
  const accountId = await db.accounts.add({
    name: account.name,
    showOnDashboard: account.showOnDashboard,
    type: account.type,
    currencies: account.currencies,
  });

  return accountId;
};

const useSaveTransactions = async (transaction) => {
  // for  account and amount that use for debit expense or add income

  const firstAccountTransaction = {
    id: transaction.firstAccountInfo?.id,
    amount: transaction.firstAccountAmount,
    code: transaction.firstAccountCode,
    name: transaction.firstAccountInfo.name,
  };

  // for  account and amount that use receive amount from transfer
  const secondAccountTransaction = {
    id: transaction?.secondAccountInfo.id,
    amount: transaction?.secondAccountAmount,
    code: transaction?.secondAccountCode,
    name: transaction?.secondAccountInfo.name,
  };

  const accountTransactionInfo =
    transaction.type !== 'transfer'
      ? [firstAccountTransaction]
      : [firstAccountTransaction, secondAccountTransaction];

  // save transaction to db itself
  const transactionsId = await db.transactions.add({
    type: transaction.type,

    // add accountTransactions info

    accountTransactionInfo,

    // add note and date for transactions
    note: transaction.note,
    date: transaction.date,

    // add tags for transactions
    tags: transaction.tags,
  });

  return transactionsId;
};

const useSaveTags = async (tag) => {
  // save tag to db itself
  const tagsId = await db.tags.add({
    name: tag,
  });

  return tagsId;
};

export { useSaveAccount, useSaveTransactions, useSaveTags };
