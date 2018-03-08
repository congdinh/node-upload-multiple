var multer = require('multer');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs')); // adds Async() versions that return promises
var path = require('path');
var _ = require('lodash');


var storage = multer.diskStorage({
  destination: function(request, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function(request, file, callback) {
    console.log(file.originalname);
    callback(null, file.originalname);
  }
});
var upload = multer({
  storage: storage
}).array('photo', 50);
var sess;

// async version with basic error handling
var walk = async (function(dir) {
  var files = await (fs.readdirAsync(dir));
  // var paths = _.map(files, function (file) { return path.join(dir, file); });
  // var stats = await (_.map(paths, function (path) { return fs.statAsync(path); })); // parallel!
  // return _.filter(stats, function (stat) { return stat.isFile(); });
  return files;
});


var dashboard = {
  userDashboard: function(req, res) {
    sess = req.session;
    if (!sess.USER) {
      return res.redirect('/user/login');
    }
    res.render('dashboard', {
      data: null
    });
  },
  userUpload: function(req, res) {
    sess = req.session;
    if (!sess.USER) {
      return res.redirect('/user/login');
    }
    upload(req, res, function(err) {
      if (err || !req.files) {
        console.log('Error Occured');
        return res.end('Error upload file. Please try again.')
      }
      // request.files is an object where fieldname is the key and value is the array of files
      var url = req.protocol + '://' + req.get('host') + '/uploads/';
      res.status(200).send({
        data: req.files,
        url: url
      });
    });
  },
  userHistory: function(req, res) {
    sess = req.session;
    if (!sess.USER) {
      return res.redirect('/user/login');
    }
    var url = req.protocol + '://' + req.get('host') + '/uploads/';
    walk(path.resolve('public/uploads/'))
      .then(function(result) {
        return res.render('history', {
          data: result,
          url: url
        });
      })
      .catch(function(err) {
        console.log('Something went wrong: ' + err);
        return res.send('Something went wrong: ' + err);
      });
  }
};
module.exports = dashboard;
