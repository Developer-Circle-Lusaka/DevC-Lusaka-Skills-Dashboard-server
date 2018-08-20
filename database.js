
let mongoose = require('mongoose');
import config  from './config'
class Database {
  constructor() {
    this._connect()
  }
_connect() {
     mongoose.connect(config.db.uri)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}
module.exports = new Database()