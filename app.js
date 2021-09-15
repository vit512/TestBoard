const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser')
const logger = require('morgan');

app.set('view engine', 'pug');
app.set('views', './views/');
app.set('views', path.join(__dirname, 'views'));

//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//const usersRouter = require('./routes/users');
const formRouter = require('./routes/form');
const mysqlRouter = require('./routes/mysql');
const boardRouter = require('./routes/board.js');
const indexRouter = require('./routes/board.js');

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/form', formRouter);
app.use('/mysql', mysqlRouter);
app.use('/board', boardRouter);

//app.listen(3000);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
console.log('server is started with port 5000.');