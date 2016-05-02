var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
require('./models/Users');
require('./config/passport');
var router = require('./routes');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/conduit');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use('/api', router);
app.use(express.static(__dirname + '/build'));

app.listen(80, function() {
  console.log('listening on port 3000');
});
