var express = require('express');
var router = express.Router();

const getVideos = require('../db/videos/getAllVideos')

const authCheck = (req, res, next) => {
    if(req.user) {
        if(req.user.auth >= 1) {
            next()
        } else {
            res.redirect('/auth/redirect')
        }
    } else {
        res.redirect('/')
    }
}

router.get('/home', authCheck, async (req, res, next) => {
    const db = req.app.get("db")
    let videos = await getVideos(db)
    res.render("admin/home", {title: "Admin Home", videosRaw: JSON.stringify(videos), user: JSON.stringify(req.user)})
})

router.get('/library', authCheck, async (req, res, next) => {
    const db = req.app.get("db")
    let videos = await getVideos(db)
    res.render("admin/library", {title: "Admin Library", videosRaw: JSON.stringify(videos), user: JSON.stringify(req.user)})
})

router.get('/users', authCheck, async (req, res, next) => {
    const db = req.app.get("db")
    let videos = await getVideos(db)
    res.render("admin/users", {title: "Admin Users", videosRaw: JSON.stringify(videos), user: JSON.stringify(req.user)})
})

router.get('/u/newvideo', authCheck, (req, res, next) => {
    res.render("admin/video_studio", {title: "Video Studio", user: JSON.stringify(req.user)})
})

module.exports = router;
