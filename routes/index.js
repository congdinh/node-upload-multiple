var express = require('express');
var router = express.Router();
var user = require('./user');
var dashboard = require('./dashboard');
var sess;

router.get('/', function(req, res) {
  sess = req.session;
  if (!sess.USER) {
    res.render('index', {
      message: ''
    });
  } else {
    res.redirect('/dashboard');
  }
});

router.get('/user/login', function(req, res, next) {
  sess = req.session;
  if (!sess.USER) {
    res.render('index', {
      message: ''
    });
  } else {
    res.redirect('/dashboard');
  }
});
router.post('/login', user.login);

router.get('/dashboard', dashboard.userDashboard);

router.get('/upload', function(req, res) {
  res.redirect('/dashboard');
});
router.post('/upload', dashboard.userUpload);

router.get('/user/logout', function(req, res) {
  sess = req.session;
  sess.USER = null;
  res.redirect('/');
});

router.get('/history', dashboard.userHistory);

module.exports = router;
