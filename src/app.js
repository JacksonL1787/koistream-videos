var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'bin')));

app.use('/', indexRouter);

const port = 3000
const server = app.listen(port, () => console.log('DTECH Community webserver started on port '+ port + "!"));
console.log('DTECH Community is now accessible from https://community.designtechhs.com')

module.exports = app;
