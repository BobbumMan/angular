var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

router.post('/articles', auth, function(req, res) {
  if (!req.body.title || !req.body.description || !req.body.body) {
    return res.status(400).json({errors: 'Please fill out all fields'});
  }
  var article = new Article();
  article.title = req.body.title;
  article.description = req.body.description;
  article.body = req.body.body;
  article.author.username = req.payload.username;
  article.author.image = req.payload.image;
  article.tagList = req.body.tagList;
  article.save(function(err, saved) {
    if (err) { return res.status(400).json({errors: "Error saving article"}); }
    return res.json({article: saved});
  });
});

router.get('/articles/:_id', function(req, res) {
  Article.findById(req.params._id, function(err, article) {
    if (err || !article) { return res.status(400).json({errors: "Error finding article"}); }
    return res.json({article: article});
  });
});

router.put('/articles/:_id', function(req, res) {
  Article.findById(req.params._id, function(err, article) {
    article.title = req.body.title;
    article.description = req.body.description;
    article.body = req.body.body;
    article.tagList = req.body.tagList;
    article.save(function(err, saved) {
      if (err) { return res.status(400).json({errors: "Error saving article"}); }
      return res.json({article: saved});
    });
  });
});

router.delete('/articles/:_id', function(req, res) {
  Article.findByIdAndRemove(req.params._id, function(err) {
    if (err) { return res.status(400).json({errors: "Error deleting article"}); }
    return res.json({success: true});
  });
});


module.exports = router;
