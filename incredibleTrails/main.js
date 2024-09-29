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

const trailRoutes = require('./routes/trails')

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

app.use('/trails', trailRoutes);

app.get('/', (req,res)=>{
    res.render('home')
})

app.listen('3000', ()=>{
    console.log("Server Running...........");
})


