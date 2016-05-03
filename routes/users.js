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
  user.image = "";
  user.bio = "";
  user.setPassword(req.body.password);

  user.save(function(err) {
    if (err) { return next(err); }
    return res.json( {user : {
      token: user.generateJWT(),
      username: user.username,
      email: user.email,
      bio: user.bio,
      image: user.image
    } } );
  });
});

router.put('/user', auth, function(req, res, next) {
  User.findById(req.payload._id, function(err, user) {
    console.log(req.payload._id);
    if (err) {
      console.log(err)
      return res.status(400).json({errors: "Error retrieving user"});
    }

    user.username = req.body.username ? req.body.username : user.username;
    user.email = req.body.email ? req.body.email : user.email;
    user.image = req.body.image ? req.body.image : user.image;
    user.bio = req.body.bio ? req.body.bio : user.bio;
    if (req.body.password) {
      user.setPassword(req.body.password);
    }

    user.save(function(err) {
      if (err) { return next(err); }
      return res.json( {user : {
        token: user.generateJWT(),
        username: user.username,
        email: user.email,
        bio: user.bio,
        image: user.image
      } } );
    });
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
      return res.json( {user : {
        token: user.generateJWT(),
        username: user.username,
        email: user.email,
        bio: user.bio,
        image: user.image
      } } );
    } else {
      console.log(info);
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.get('/user', auth, function(req, res, next) {
  User.findById(req.payload._id, function(err, user) {
    if (err) {
      res.status(400).json({errors: 'Cannot find user'})
    }
    return res.json( {user : {
      username: user.username,
      email: user.email,
      bio: user.bio,
      image: user.image
      } } );
    });
});

module.exports = router;
