const router = require('express').Router();
const passport = require('passport');

const authCheck = (req, res, next) => {
    if(!req.user) {
        res.redirect('/')
    } else {
        next();
    }
}

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get('/googleRedirect',  passport.authenticate('google'), (req, res, next) => {
    if(req.user) {
       
        // Add or Update associated IP Addresses
        const db = req.app.get("db")
        console.log(req.user.associatedIPs.length)
        if(req.user.associatedIPs.length > 0 ) {
            if(!req.user.associatedIPs.includes(req.headers['x-forwarded-for'])) {
                db.collection("users").updateOne({"googleId": req.user.googleId}, {$push: {
                    associatedIPs: req.headers['x-forwarded-for']
                }})
            }
        } else {
            console.log("no associated IP addresses; adding new IP addresses")
            db.collection("users").updateOne({"googleId": req.user.googleId}, {$push: {
                associatedIPs: req.headers['x-forwarded-for']
            }})
        }

        if(req.user.auth > 0) {
            if(req.user.auth == 1) {
                res.redirect('/')
            }
            if(req.user.auth == 2 || req.user.auth == 3) {
                res.redirect('/admin/home')
            }
        } else {
            res.redirect('/pendingApproval')
        }
    } else {
        res.redirect('/')
    }
})

router.get('/redirect', async (req, res, next) => {
    if(req.user) {
        const db = req.app.get("db")
        if(req.user.auth > 0) {
            if(req.user.auth == 1 || req.user.auth == 2) {
                res.redirect('/admin/home')
                return;
            }
            res.redirect('/')
        } else {
            res.redirect('/pendingApproval')
        }
    } else {
        res.redirect('/')
    }
})

router.get('/logout', (req, res, next) => {
    req.logout()
    res.redirect('/')
})

module.exports = router;