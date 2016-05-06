var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload', credentialsRequired: false});

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

router.get('/article/:_id', auth, function(req, res) {
  Article.findById(req.params._id, function(err, article) {
    if (err || !article) { return res.status(400).json({errors: "Error finding article"}); }
    if (req.payload) {
      var favorited = (article.favorites.indexOf(req.payload.username) !== -1) ? true : false;
      return res.json({article: {
        _id: article._id,
        title: article.title,
        description: article.description,
        body: article.body,
        author: {
          username: article.author.username,
          image: article.author.image
        },
        tagList: article.tagList,
        createdAt: article.createdAt,
        favorites: article.favorites,
        favorited: favorited,
        favoritesCount: article.favoritesCount
      }});
    } else {
      return res.json({article: {
        _id: article._id,
        title: article.title,
        description: article.description,
        body: article.body,
        author: {
          username: article.author.username,
          image: article.author.image
        },
        tagList: article.tagList,
        createdAt: article.createdAt,
        favorites: article.favorites,
        favorited: false,
        favoritesCount: article.favoritesCount
      }});
    }
  });
});

router.put('/article/:_id', function(req, res) {
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

router.delete('/article/:_id', function(req, res) {
  Article.findByIdAndRemove(req.params._id, function(err) {
    if (err) { return res.status(400).json({errors: "Error deleting article"}); }
    return res.json({success: true});
  });
});

router.post('/article/:_id/favorite', auth, function(req, res) {
  Article.findById(req.params._id, function(err, article) {
    if (err) { return res.status(400).json({errors: "Error favoriting article"}); }
    article.favorites.push(req.payload.username);
    article.save(function(err, saved) {
      if (err) { return res.status(400).json({errors: "Error saving article"}); }
      return res.json({success: true});
    });
  });
});

router.delete('/article/:_id/favorite', auth, function(req, res) {
  Article.findById(req.params._id, function(err, article) {
    if (err) { return res.status(400).json({errors: "Error favoriting article"}); }
    if (article.favorites.indexOf(req.payload.username) !== -1) {
      article.favorites.splice(article.favorites.indexOf(req.payload.username));
    }
    article.save(function(err, saved) {
      if (err) { return res.status(400).json({errors: "Error saving article"}); }
      return res.json({success: true});
    });
  });
});

router.get('/article/:_id/comments', function(req, res) {
  Article.findById(req.params._id, function(err, article) {
    if (err) { return res.status(400).json({errors: "Error favoriting article"}); }
    return res.json({comments: article.comments});
  });
});

router.post('/article/:_id/comments', auth, function(req, res) {
  Article.findById(req.params._id, function(err, article) {
    if (err) { return res.status(400).json({errors: "Error adding comment"}); }
    article.comments.unshift({
      body: req.body.comment.body,
      author: {
        username: req.payload.username,
        image: req.payload.image
      }
    });
    article.save(function(err, saved) {
      if (err) { return res.status(400).json({errors: "Error saving article"}); }
      return res.json({comment: saved.comments[0]});
    });
  });
});

router.delete('/article/:_id/comments/:commentId', auth, function(req, res) {
  Article.findById(req.params._id, function(err, article) {
    if (err) { return res.status(400).json({errors: "Error destroying comment"}); }
    if (req.payload.username === article.comments.id(req.params.commentId).author.username) {
      article.comments.id(req.params.commentId).remove();
      article.save(function(err, saved) {
        if (err) { return res.status(400).json({errors: "Error saving article"}); }
        return res.json({success: true});
      });
    } else {
      return res.status(400).json({errors: "You are not the comment owner"});
    }
  });
});

router.get('/articles', function(req, res) {
  if (req.query.author) {
    Article.find().where('author.username').equals(req.query.author).skip(parseInt(req.query.offset)).limit(parseInt(req.query.limit)).exec(function(err, articles) {
      if (err) { return res.status(400).json({errors: "Error querying articles"}); }
      Article.count().where('author.username').equals(req.query.author).exec(function(err, articlesCount) {
        if (err) { return res.status(400).json({errors: "Error querying articles"}); }
        return res.json({articles: articles, articlesCount: articlesCount});
      });
    });
  } else if (req.query.favorited) {
    Article.find().where('favorites').in([req.query.favorited]).skip(parseInt(req.query.offset)).limit(parseInt(req.query.limit)).exec(function(err, articles) {
      if (err) { return res.status(400).json({errors: "Error querying articles"}); }
      Article.count().where('favorites').in([req.query.favorited]).exec(function(err, articlesCount) {
        if (err) { return res.status(400).json({errors: "Error querying articles"}); }
        return res.json({articles: articles, articlesCount: articlesCount});
      });
    });
  } else {
    Article.find().skip(parseInt(req.query.offset)).limit(parseInt(req.query.limit)).exec(function(err, articles) {
      if (err) { return res.status(400).json({errors: "Error querying articles"}); }
      Article.count().exec(function(err, articlesCount) {
        if (err) { return res.status(400).json({errors: "Error querying articles"}); }
        return res.json({articles: articles, articlesCount: articlesCount});
      });
    });
  }
});

router.get('/articles/feed', function(req, res) {
  Article.find().skip(parseInt(req.query.offset)).limit(parseInt(req.query.limit)).exec(function(err, articles) {
    if (err) { return res.status(400).json({errors: "Error querying articles"}); }
    Article.count().exec(function(err, articlesCount) {
      if (err) { return res.status(400).json({errors: "Error querying articles"}); }
      return res.json({articles: articles, articlesCount: articlesCount});
    });
  });
});

module.exports = router;
