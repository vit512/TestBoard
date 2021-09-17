import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';


const app = express();

app.set('view engine', 'pug');
app.set('views', './views/');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

import formRouter from './routes/form';
import mysqlRouter from './routes/mysql';
import boardRouter from './routes/board.js';
import indexRouter from './routes/board.js';


app.use('/', indexRouter);
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