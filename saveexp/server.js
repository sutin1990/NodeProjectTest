/* var express = require('express');
var app = express();
var helloworld = function(req,res,next){
    //res.setHeader('Content-Type','text/plain');
    res.send('Hello server port 3000');
};

//app.use('/',helloworld);
app.listen(3000);
console.log('Server running at http://localhost:3000');
module.exports = app; */
/*var mongoose = require('mongoose');
var uri = 'mongodb://localhost/players';
var db =  mongoose.connect(uri,{ useNewUrlParser: true });*/

// var config = require('./config');
// config.mongoUri
// config.sessionSecret

process.env.NODE_ENV = process.env.NODE_ENV||'development';
var mongoose = require('./config/mongoose');
var express = require('./config/express');
var passport = require('./config/passport');

var db = mongoose();
var app = express();
var passport = passport();
app.listen(3000);
module.exports = app;
console.log('Server running at http://localhost:3000');
