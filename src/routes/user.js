var express = require('express');
var router = express.Router();
const _ = require('lodash');

const getVideos = require('./db/videos/getVideos')
const getVideoById = require('./db/videos/getVideoById')
const addView = require('./db/videos/addView')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const db = req.app.get("db")
  let videos = await getVideos(db)
  videos = videos.map((v) => _.omit(v, ['uploadMeta', 'uploadDate', 'description', '_id']))
  videos = videos.sort((a,b) => {
    let dateA = new Date(a.streamDate)
    let dateB = new Date(b.streamDate)
    return dateA - dateB;
  })
  res.render('user/index', { title: 'Previous Streams', videos: JSON.stringify(videos)});
});

router.get('/v/:videoId', async function(req, res, next) {
  const videoId = req.params.videoId
  const db = req.app.get("db")
  addView(db,videoId)
  let video = await getVideoById(db, videoId)
  video = _.omit(video, ['uploadMeta', 'uploadDate'])
  let title = "Not Found"
  if(video.id) {
    title = video.title
  }
  res.render('user/video', { title: title , video: JSON.stringify(video)});
});

router.get('/pendingApproval', async function(req, res, next) {
  if(req.user) {
    const db = req.app.get("db")
    if(req.user.auth == 0) {
      res.render('pendingApproval',{ title: 'Pending Approval' })
    } else {
      res.redirect('/auth/redirect')
    }
  } else {
    res.redirect('/')
  }
})

module.exports = router;
