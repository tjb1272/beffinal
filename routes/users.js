const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../models');
const { ensureAuthenticated } = require('../authorize/auth');
const flash = require('connect-flash');


// Register
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    db.User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    });
    req.flash('success_msg', 'You have successfully registered your account!');
    res.redirect('dash');
});

//Login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/users/success',
        failureRedirect: '/users/failure'
    })(req, res, next);
    console.log('log in attempt');
});

//Posting
router.post('/posting', (req, res) => {
    db.Post.create({
        title: req.body.title,
        UserId: req.user.id
    });
    req.flash('success_msg', 'You have successfully created your post!');
    res.redirect('dash');
    console.log('hello');
});

router.get('/posting', (req, res) => {
    res.render('posting');
});

//Home
router.get('/dash', (req, res) => {
    res.render('dash');
});

//Logout
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', 'You are now logged out!');
    res.redirect('dash');
    console.log('logged out');
});

//Failure
router.get('/failure', (req, res) => {
    req.flash('error_msg', 'Something went wrong! Please try again.');
    res.redirect('login');
    console.log('log in failure');
});

//Success
router.get('/success', (req, res, next) => {
    res.render('posting');
    console.log('log in success');
});

router.get('/protected', ensureAuthenticated, (req, res) => {
    res.send('You have successfully logged in.');
});

module.exports = router;
