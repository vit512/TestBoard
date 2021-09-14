const express = require('express');
const router = express.Router();
const mysql_odbc = require('../db/db_conn')();
const connection = mysql_odbc.init();


//const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host : '127.0.0.1',
//   port : 3306,
//   user : 'root',
//   password : '6245',
//   database : 'nodedb'
// });

// 메인페이지
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TEST BOARD' });
});

// 게시판 글 목록
router.get('/page', function(req, res, next) {
  res.redirect('/board/page/1');
});

router.get('/page/:page', function(req, res, next) { 
  const page = req.params.page; 
  const sql =  `SELECT idx, name, title, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, 
    date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,hit FROM board ORDER BY regdate DESC`;    

  connection.query(sql, function(err, rows) {
    if(err) 
      console.err("err : " + err);
    res.render('page', {title : '게시판 글목록', rows:rows, page:page, length:rows.length-1, page_num:10, pass:true}); 
    console.log(rows.length-1);
  });
});

//삽입 페이지
router.get('/write', function(req, res, next) { 
  res.render('write', {title : "게시판 글쓰기"})
});

router.post('/write', function(req, res, next) {
  const name = req.body.name;                   
  const title = req.body.title;
  const content = req.body.content;
  const passwd = req.body.passwd;
  const datas = [name, title, content, passwd]; 
  
  const sql = `INSERT INTO board(name, title, content, regdate, modidate, passwd, hit) VALUES(?,?,?,now(),now(),?,0)`; 
  connection.query(sql, datas, function(err,rows) { 
    if(err) 
      console.error("err : " + err);
    res.redirect('/board/page')
  });
});

//상세 페이지
router.get('/read/:idx', function(req, res, next) { 
  const idx = req.params.idx; 
  const sql = `SELECT idx, name, title, content, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, 
    date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate, hit from board where idx=?`;
    connection.query(sql,[idx], function(err, rows) {  
      if(err)
        console.error("err : " + err);
    res.render('read', {title : '상세 페이지', rows:rows[0]}); 
    });
});

// 수정 페이지
router.get('/edit/:idx', function(req, res, next) { 
  const idx = req.params.idx; 
  const sql = `SELECT idx, name, title, content, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, 
    date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate, hit from board where idx=?`;
    connection.query(sql,[idx], function(err, rows) {  
      if(err)
        console.error("err : " + err);
    res.render('edit', {title : '수정 페이지', rows:rows[0]}); 
    });
});

//수정하기
router.post('/update', function(req, res, next) {
  const idx = req.body.idx;
  const name = req.body.name;
  const title = req.body.title;
  const content = req.body.content;
  const passwd = req.body.passwd;
  const datas = [name, title, content, idx, passwd]; 

  const sql = `UPDATE board SET name=?, title=?, content=? ,modidate=now() WHERE idx=? AND passwd=?`; 
  connection.query(sql, datas, function(err, result){
    if(err) 
      console.error(err);
    if(result.affectedRows == 0) { 
      res.send("<script>alert('비밀번호가 일치하지않습니다.');history.back();</script>");
    } else {
      //-res.redirect('/board/read/' + idx);
      // res.redirect('/board/page');
      res.send("<script>alert('수정되었습니다.');location.replace('/board/page');</script>");
      }
  });
});

//삭제
router.post('/delete', function(req,res,next) {
  const idx = req.body.idx;
  const passwd = req.body.passwd;
  const datas = [idx, passwd];  
  const sql = 'DELETE FROM board WHERE idx=? AND passwd=?';
  connection.query(sql, datas, function(err, result) {
    if(err) console.error(err);
    if(result.affectedRows == 0){
      res.send("<script>alert('비밀번호가 일치하지않습니다.');history.back();</script>");
    } else {
      // res.redirect('/board/page');
      res.send("<script>alert('삭제되었습니다.');location.replace('/board/page');</script>");
    }
  });
});

//리스트에서 삭제
router.get('/delete/:idx', function(req, res, next) { 
  const idx = req.params.idx; 
  const sql =  `DELETE FROM board WHERE idx=?`;    
  connection.query(sql, [idx], function(err, rows) {
    if(err) 
      console.err("err : " + err);
    res.send("<script>alert('삭제되었습니다.');location.replace('/board/page');</script>");
  });
});

module.exports = router;
