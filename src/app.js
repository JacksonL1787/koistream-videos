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
const fs = require('fs');
const moment = require("moment")

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

var videoUploadFolder;

var storage_video = multer.diskStorage({
	destination: (req, file, cb) => { 
    if(file.mimetype.toLowerCase().replace(/\s/g, '').indexOf("video") !== -1) {
      videoUploadFolder = randomstring.generate({length: 6, charset: 'alphabetic'})
      fs.mkdirSync("bin/videos/" + videoUploadFolder);
      cb(null, 'bin/videos/' + videoUploadFolder)
    } else if(file.mimetype.toLowerCase().replace(/\s/g, '').indexOf("image") !== -1) {
      cb(null, 'bin/videos/' + videoUploadFolder)
    }
	},
	filename: function(req, file, cb) {
    if(file.mimetype.toLowerCase().replace(/\s/g, '').indexOf("video") !== -1) {
      cb(null, "video" + path.extname(file.originalname));
    } else if(file.mimetype.toLowerCase().replace(/\s/g, '').indexOf("image") !== -1) {
      cb(null, "thumbnail.png");
    }
	}
})

var upload_video = multer({ storage: storage_video })
 
app.post('/admin/u/video', upload_video.array('videoUPL'), (req, res, next) => {
  const files = req.files
  console.log(files)
  if (!files[0]) { 
    console.log("[File Upload]  Uploaded content failed to upload")
    res.sendStatus(393)
  } else {
    mongoose.connect(`mongodb://localhost:27017/DesignTechHS`, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
      client.collection('videos').insertOne({"id": files[0].destination.slice(11), "title": req.body.title, "streamDate": Number(req.body.streamDateS), "uploadDate": Date.now(), "description": req.body.description, "views": 0, "uploadMeta": {"uploadUserGID": req.body.googleId}})
    })
    console.log("[File Upload]  Uploaded content completed")
    res.json({"status": 200, "folder": videoUploadFolder, "meta_file": files})
    videoUploadFolder = "";
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'bin')));
app.use(express.static(path.join(__dirname, '..', 'libs')));
app.use(bodyParser.json({limit:'50G'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'50G'}));

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
