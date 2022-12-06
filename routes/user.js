const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const passport = require('passport');
const users = require('../controllers/users');

router.post('/manual', users.register);

router.get('/google',passport.authenticate('google',{scope:['profile']}));
router.get('/google/callback/', passport.authenticate('google',{failureRedirect:'/auth/fail'}),
(req, res) => {
    res.send('registered');
}
)

module.exports = router;