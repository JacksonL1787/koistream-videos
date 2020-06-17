var express = require('express');
var router = express.Router();

const getVideos = require('./db/videos/getVideos')
const getVideoById = require('./db/videos/getVideoById')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const db = req.app.get("db")
  let videos = await getVideos(db)
  res.render('user/index', { title: 'Previous Streams' });
});

router.get('/v/:videoId', async function(req, res, next) {
  const videoId = req.params.videoId
  const db = req.app.get("db")
  let video = getVideoById(db, videoId)
  res.render('user/video', { title: videoId });
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
