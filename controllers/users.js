const passport = require('passport-google-oauth20');
const User = require('../models/Users');
module.exports.register = async(req, res)=>{
    console.log('inside controller', req.body);
    const user = new User({
        email: req.body.email,
        name: req.body.name
    })
    user.save();
   
    res.redirect('/user');
}