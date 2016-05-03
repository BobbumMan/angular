var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

router.get('/profiles/:username', auth, function(req, res) {
  User.findOne({username: req.params.username}, function(err, profile) {
    if (err) { return res.status(400).json({errors: "Profile does not exist"}); }
    User.findById(req.payload._id, function(err, user) {
      if (err) { return res.status(400).json({errors: "Profile does not exist"}); }
      return res.json({profile: {
        username: profile.username,
        image: profile.image,
        bio: profile.bio,
        email: profile.email,
        following: (user.following.indexOf(req.params.username) !== -1) ? true : false
      }});
    });
  });
});

router.post('/profiles/:username/follow', auth, function(req, res) {
  User.findById(req.payload._id, function(err, user) {
    if (err) {
      return res.status(400).json({errors: "Profile does not exist"});
    }
    user.following.push(req.params.username);
    user.save(function(err) {
      if (err) { return next(err); }
      res.json({success: true});
    });
  });
});

router.post('/profiles/:username/unfollow', auth, function(req, res) {
  User.findById(req.payload._id, function(err, user) {
    if (err) {
      return res.status(400).json({errors: "Profile does not exist"});
    }
    user.following.splice(user.following.indexOf(req.params.username));
    user.save(function(err) {
      if (err) { return next(err); }
      res.json({success: true});
    });
  });
});

module.exports = router;
