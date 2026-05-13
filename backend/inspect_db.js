const Database = require('better-sqlite3');
const db = new Database('.tmp/data.db');

try {
  const tableInfo = db.prepare("PRAGMA table_info(up_users)").all();
  console.log('up_users columns:', tableInfo.map(c => c.name));
  
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log('All tables:', tables.map(t => t.name));
} catch (err) {
  console.error(err);
} finally {
  db.close();
}
