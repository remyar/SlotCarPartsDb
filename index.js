require('dotenv').config();
 
var path = require('path');
var express = require('express');
var handlebars = require("express-handlebars");
var expressRoute = require('express4-routes-loader');
var helpers = require('handlebars-helpers')();
var routes = require('./routes/core.routes.js');
var bodyParser = require('body-parser');

var app = express();
 
var path = require('path');

app.use(express.static(__dirname + '/themes/' + process.env.WEB_THEME + '/static'));
app.use(express.static(__dirname + '/uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname , '/themes/' + process.env.WEB_THEME));
  
helpers.i18n = require('./helpers/i18n');
app.engine('hbs', handlebars({ extname: '.hbs' , partialsDir: './themes/' + process.env.WEB_THEME , helpers: helpers}));
 
 
//-- check use Debug
app.use(function (req, res, next) {
    if ( req.objRet == undefined )
        req.objRet = {};
 
    req.objRet.layout = false;
    req.objRet.debug = false;
    if ( process.env.APP_DEBUG == "true" )
    {
        req.objRet.debug = true;
    }

    let acceptLanguage = req.headers['accept-language'] || "en";
    acceptLanguage = acceptLanguage.split(';')[0].split('-')[0];
    req.objRet.locale = acceptLanguage;

    next();
});

 
expressRoute.load(app , Object.assign({} , routes ));
 
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});
 
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
 
    let objRet = {};
 
    if ( process.env.APP_DEBUG == "true" )
        objRet.debug = true;
 
    objRet.message = err.message;
    objRet.status = err.status || 500;
    objRet.error = {};
 
    if ( process.env.APP_DEBUG == "true")
        objRet.stack = err.stack;
 
    if ( req.objRet != undefined)
        objRet = Object.assign({} , objRet , req.objRet );
 
    res.render('error', objRet );        
});
 
 
var server = app.listen(process.env.APP_SERVEUR_PORT, function() {
    console.log('Express server listening on port ' + server.address().port);
});