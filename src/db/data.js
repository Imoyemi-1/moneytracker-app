import Dexie from 'dexie';

const db = new Dexie('MoneyTrackerDB');

db.version(2).stores({
  accounts: '++id, type,  name, showOnDashboard ,currencies',
  settings: 'key',
  exchangeRates: 'id',
  transactions:
    '++id, type, firstAccountTransaction, secondAccountTransaction, note, date',
  tags: '++id, name',
});

export default db;
