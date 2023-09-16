const path = require('node:path')

module.exports = function(dbName) {
  const db_path = path.join(__dirname, dbName)
  console.log(db_path)
  return require('better-sqlite3')(db_path)
}
