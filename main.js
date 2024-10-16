if(process.env.NODE_ENV != 'production')
    {
        require('dotenv').config();
    }
    
const express = require('express');
const app = express();
const path = require('path')
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const ejsMate = require('ejs-mate');
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const User = require('./models/user.js')


const trailRoutes = require('./routes/trails.js')
const authRoutes = require('./routes/auths.js')


mongoose.connect('mongodb://localhost:27017/trails')
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
})

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'pages'));
app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));


const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires : Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7

    }
}

app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) =>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.welcome = req.flash('welcome');
    next();
})

app.use('/trails', trailRoutes);
app.use('/', authRoutes);

app.get('/', (req,res)=>{
    res.render('home')
})

app.get('/contact', (req,res)=>{
    res.render('contact')
})

app.get('/gallery', (req,res)=>{
    res.render('gallery')
})
app.get('/aboutus', (req,res)=>{
    res.render('aboutus')
})

app.get('/trips', (req,res)=>{
    res.render('trips')
})

app.listen('3000', ()=>{
    console.log("Server Running...........");
})


