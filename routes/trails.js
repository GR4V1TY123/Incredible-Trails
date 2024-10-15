const Trail = require('../models/trail')

const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const flash = require('connect-flash')
const {isLoggedIn} = require('../middleware.js')


const trails = require('../controller/trail')

router.route('/list')
    .get(isLoggedIn,trails.list)


module.exports = router;
