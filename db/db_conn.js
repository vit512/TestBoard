// const mysql = require('mysql');
// const config = require('../db_info').local;
import mysql from 'mysql';

export function init() {
  return mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '6245',
    database: 'nodedb'
  });
}

// export default {
//   init() {
//     return mysql.createConnection({
//       host: '127.0.0.1',
//       port: '3306',
//       user: 'root',
//       password: '6245',
//       database: 'nodedb',
//     });
//   },
// };

// module.exports = function () {
//   return {
//     init: function () {
//       return mysql.createConnection({
//         host: '127.0.0.1',
//         port: '3306',
//         user: 'root',
//         password: '6245',
//         database: 'nodedb',
//         multipleStatements: true,
//       });
//     },
//   };
// };
