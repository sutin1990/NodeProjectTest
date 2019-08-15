var config = require('./config');
var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var cookiesession = require('cookie-session');
var session = require('express-session');
var passport = require('passport');

module.exports = function(){
    var app = express();
        app.use(cookiesession({
            secret:config.sessionSecret,
            resave:false,
            saveUninitialized:true,
            name:'session',
            keys:['secret_key1','secret_key2']
        }));
        
    app.use(passport.initialize());
    app.use(passport.session());  

    if(process.env.NODE_ENV==='development'){
        app.use(morgan('dev'));
    }else{
        app.use(compression);
    }
    app.use(bodyParser.urlencoded({
        extended:true
    }));
    app.use(bodyParser.json());
    app.use(validator());

    app.set('views','./app/views');
    app.set('view engine', 'jade');
    require('../app/routes/index.routes')(app);
    require('../app/routes/user.routes')(app);
    return app;
}