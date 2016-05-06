var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
require('./models/Users');
require('./models/Articles');
require('./config/passport');
var users = require('./routes/users.js');
var profiles = require('./routes/profiles.js');
var articles = require('./routes/articles.js');
var tags = require('./routes/tags.js');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/conduit');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use('/api', users);
app.use('/api', profiles);
app.use('/api', articles);
app.use('/api', tags);

app.use(express.static(__dirname + '/build'));

app.listen(80, function() {
  console.log('listening on port 3000');
});
