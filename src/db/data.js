import Dexie from 'dexie';

const db = new Dexie('MoneyTrackerDB');

db.version(1).stores({
  accounts: '++id, type,  name, showOnDashboard ,currencies',
});

export default db;
