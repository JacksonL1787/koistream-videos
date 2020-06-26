var express = require('express');
var router = express.Router();

const getVideos = require('../db/videos/getVideos')

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

router.get('/getTotalViews', authCheck, async (req, res, next) => {
    if(req.user) {
        const db = req.app.get("db")
        let videos = await getVideos(db)
        let totalViews = 0
        for(var i = 0; i < videos.length; i++) {
            totalViews = totalViews + videos[i].views;
        }
        res.json({"status": 200, "payload": {"number_of_videos": videos.length, "total_views": totalViews}})
    }
})

router.post('/getUserData', authCheck, async (req, res, next) => {
    if(req.user) {
        const db = req.app.get("db")
        let user = await db.collection("users").find({"googleId": req.body.GID}).toArray()
        res.json({"status": 200, "payload": {user}})
    }
})

router.post('/removeVideo', authCheck, async (req, res, next) => {
    if(req.user) {
        const db = req.app.get("db")
        db.collection("videos").remove({"id": req.body.id})
        res.json({"status": 200, "payload": {"message": "successfully deleted the video with id: " + req.body.id}})
    }
})

router.get('/u/newvideo', authCheck, (req, res, next) => {
    res.render("admin/video_studio", {title: "Video Studio", user: JSON.stringify(req.user)})
})

module.exports = router;
