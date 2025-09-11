import db from '../db/data';

const useGetAccounts = async () => {
  const accounts = await db.accounts.toArray();
  const accountsWithCurrencies = await Promise.all(
    accounts.map(async (account) => {
      return { ...account };
    })
  );
  return accountsWithCurrencies;
};

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

export { useGetAccounts, useSaveAccount };
