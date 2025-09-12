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

export { useSaveAccount };
