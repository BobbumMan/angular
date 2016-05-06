var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload', credentialsRequired: false});

router.get('/tags', function(req, res) {
  Article.find().distinct('tagList').exec(function(err, tags) {
    if (err) return res.status(400).json({errors: 'Error retrieving tags'});
    return res.json({tags: tags});
  });
});

module.exports = router;
