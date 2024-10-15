const express = require('express');
const router = express.Router();
const passport = require('passport')
const LocalStrategy = require('passport-local')
const users = require('../controller/user')

router.route('/login')
    .get(users.loginForm)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),users.login)

router.route('/register')
    .get(users.registerForm)
    .post(users.register)

module.exports = router