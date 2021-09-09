var express = require('express');
var router = express.Router();
var mysql = require('mysql');
 
router.get('/', function(req, res, next) {
 
  var connection = mysql.createConnection({
      host  :'127.0.0.1',
      port : 3306,
      user : 'root',
      password : '6245',
      database:'nodedb'
  });
  
  connection.connect(function(err) {
      if (err) {
          res.render('mysql', { connect: '연결 실패',err:err });
          console.error(err);
          throw err;
      }else{
          res.render('mysql', { connect: '연결 성공',err:'없음' });
      }
  });
  connection.end();
});

module.exports = router;