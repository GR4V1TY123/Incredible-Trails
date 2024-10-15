const Trail = require('../models/trail')

const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const flash = require('connect-flash')

const trails = require('../controller/trail')

router.route('/properties/v2/list-by-map')
    .get(trails.list)


module.exports = router;
