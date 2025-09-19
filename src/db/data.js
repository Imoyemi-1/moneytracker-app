import Dexie from 'dexie';

const db = new Dexie('MoneyTrackerDB');

db.version(2.1).stores({
  accounts: '++id, type,  name, showOnDashboard ,currencies',
  settings: 'key',
  exchangeRates: 'id',
  transactions: '++id, type, accountTransactionInfo, note, date',
  tags: 'name',
});

export default db;
