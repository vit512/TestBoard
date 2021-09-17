import express from 'express';
import mysql from 'mysql';

const router = express.Router();

// import mysql_odbc from '../db/db_conn';
// const connection = mysql_odbc.init();

router.get('/', function (req, res, next) {
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '6245',
    database: 'nodedb',
  });

  connection.connect(function (err) {
    if (err) {
      res.render('mysql', {
        connect: '연결 실패',
        err: err,
        title: 'DB연결테스트',
      });
      console.error(err);
      throw err;
    } else {
      res.render('mysql', {
        connect: '연결 성공',
        err: '없음',
        title: 'DB연결테스트',
      });
    }
  });
  connection.end();
});

module.exports = router;
