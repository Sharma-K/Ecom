if(process.env.NODE_ENV !== "production")
{
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/Users');
const path = require('path');
// const methodOverride = require('method-override');
const passport = require('passport')
const Strategy = require('passport-google-oauth20');
const session = require('express-session');
const ejsMate = require('ejs-mate');
const userRoutes = require('./routes/user');
const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/ecom'

app.use(session(
    {
        name: 'Ecom.sid',
        secret: 'thisisasecret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            maxAge: 1000*60*60*24*7
        }
    }
))

app.use(passport.initialize());
app.use(passport.session());


passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback/'
},
function(accessToken, refreshToken, profile, done){
   
    done(null, {});
}
));
passport.serializeUser(function(obj, cb){
    cb(null, obj);
});
passport.deserializeUser(function(obj, cb){
    cb(null, obj);
});

//register user will have to register through the jwt authentication which is through the google or email id

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbURL);
  console.log('database connected');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
// app.use(methodOverride('_method'));
app.get('/user', (req, res) => {

    
        res.send('this is the post cmmand');
   

})



// app.get('/register', (req, res) => {
//     res.send('regisered')
// })

// app.get('/auth/google', passport.authenticate('google',{scope:['profile']}))
// app.get('/auth/google/callback/', passport.authenticate('google',{failureRedirect:'/auth/fail'}),
// (req, res) => {
//     res.send('registered');
// }
// );

app.use('/auth/', userRoutes);
// app.get('/auth/fail',(req, res)=>{
//     res.send('failed');
// })

app.get('/register', (req, res)=> {
   console.log('this is the user',req.user);
    res.render('registered');
})




app.listen(3000, ()=>{
    console.log('listening to port 3000');
})