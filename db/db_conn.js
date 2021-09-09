const mysql = require('mysql');
const config = require('./db_info').local;
 
module.exports = function () {
    return {
        init: function () {
            return mysql.createConnection({
                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password,
                database: config.database,
                multipleStatements: true
            })
        }
    }
};