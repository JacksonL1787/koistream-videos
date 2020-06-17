require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const mongoose = require('mongoose')
const flash = require('connect-flash');
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const colors = require("colors")
const randomstring = require('randomstring')

var multer = require('multer');

const passportSetup = require('./config/passport-setup')

var userRouter = require('./routes/user');
var authRouter = require('./routes/auth/auth');
var adminRouter = require('./routes/admin/admin')
 
mongoose.connect(`mongodb://localhost:27017/DesignTechHS`, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
  if(err) {
    console.log('    ')
    console.log(' DB Alert '.bgRed.white.bold + '  There was an issue connecting to the database.'.bold.red)
    console.log('    ')
    console.log(' DB Alert '.bgRed.white.bold + '  DB error has been added to logs, shutting down server'.bold.red)
    console.log('    ')
    console.log(err)
    server.close()
  } else {
    console.log('    ')
    console.log('DesignTechHS Database Online')
    console.log('DesignTechHS Database Connection Successful')
    console.log('    ')
  }
  app.set('db', client)
});


// var storage_errorCap = multer.diskStorage({
//   destination: 'src/static/img/uploads/errors/index',
//   filename: function(req, file, cb) {
//     cb(null, "error_capture" + '-' + Date.now() + '-' + randomstring.generate() + '.jpg');
//   }
// })

// var upload_errorCap = multer({ storage: storage_errorCap })
 
// app.post('/tst/uploadfile', upload_errorCap.single('blob'), (req, res, next) => {
//   const file = req.file
//   if (!file) {
//     res.sendStatus(393)
//   } else {
//     mongoose.connect(`mongodb://localhost:27017/DesignTechHS`, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
//       client.collection('errors').updateOne({"errorID": req.body.id}, {$push : {"errorCaptures" : {"errorCapture": req.file.filename, "timestamp": req.body.timestamp}}})
//     })
//     res.sendStatus(200)
//   }
// })


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'bin')));
app.use(express.static(path.join(__dirname, '..', 'libs')));

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['broadcastingdtechcommunity']
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', userRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter)

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

const port = 3000
const server = app.listen(port, () => console.log('DTECH Community webserver started on port '+ port + "!"));
console.log('DTECH Community is now accessible from https://community.designtechhs.com')

module.exports = app;
