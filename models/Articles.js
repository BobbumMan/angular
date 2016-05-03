var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
  title: String,
  author: {
    username: String,
    image: String
  },
  description: String,
  body: String,
  tagList: [String],
  createdAt: {type: Date, default: Date.now},
  favorites: [String]
});

mongoose.model('Article', ArticleSchema);
