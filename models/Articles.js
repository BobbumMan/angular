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
  favorites: [String],
  comments: [{ body: String, createdAt: {type: Date, default: Date.now}, author: {username: String, image: String}}]
});

ArticleSchema.virtual('favoritesCount').get(function() {
  return this.favorites.length;
})

mongoose.model('Article', ArticleSchema);
