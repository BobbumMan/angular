var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

router.post('/users', function(req, res, next) {
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save(function(err) {
    if (err) { return next(err); }
    return res.json({user :{token: user.generateJWT()}});
  });

});

router.post('/users/login', function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({message: "Please fill out all fields"});
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (user) {
      return res.json( {user : {token: user.generateJWT()} } );
    } else {
      console.log(info);
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.get('/user', auth, function(req, res, next) {
  console.log(req.payload);
  return res.json({user: req.payload});
});

module.exports = router;
