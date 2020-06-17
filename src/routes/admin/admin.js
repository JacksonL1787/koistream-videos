var express = require('express');
var router = express.Router();

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

router.get('/home', authCheck, (req, res, next) => {
    res.render("admin/home", {title: "Admin Home", user: JSON.stringify(req.user)})
})

router.get('/u/newvideo', authCheck, (req, res, next) => {
    res.render("admin/video_studio", {title: "Video Studio", user: JSON.stringify(req.user)})
})

module.exports = router;
