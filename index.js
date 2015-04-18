// libs
var express = require('express');
var app 	= express();
var server 	= app.listen(PORT);
var io		= require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

// config

var PORT = process.env.PORT || 5000;
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

var conf = {
    client_id:      '474840302668268'
  , client_secret:  'f0613480861a06dc54ac517b5730d5c4'
  , scope:          'email, user_about_me'
  , redirect_uri:   'http://listenhere.herokuapp.com/app/'
};

// constants

var FB_APP_ID = 474840302668268;
var FB_SECRET = "f0613480861a06dc54ac517b5730d5c4";

var PARSE_APP_ID = '6g5rdM4QiKNQwXMCrr8tvEuHpad7mdYsjbgLRUhA';
var PARSE_JS_KEY = 'KKRi6LU0KSyfVuKxA7xjfVTBCUpKg8vNVdjEyZGz';

// internals

var lhChat = require('./chat.js');
var lhNearMe = require('./findNearMe.js');
var fbLogin = require('./fbLogin.js');

// routing

app.get('/', function(request, response) {
	response.send('/hack');
});

app.get('/fb_login', function(request, response) {
	fbLogin.process(request, response);
});

app.get('/find_near_me', function(request, response) {
	lhNearMe.process(request, response);
});

app.get('/auth/facebook', function(req, res) {

  // we don't have a code yet
  // so we'll redirect to the oauth dialog
  if (!req.query.code) {
    var authUrl = graph.getOauthUrl({
        "client_id":     conf.client_id
      , "redirect_uri":  conf.redirect_uri
      , "scope":         conf.scope
    });

    if (!req.query.error) { //checks whether a user denied the app facebook login/permissions
      res.redirect(authUrl);
    } else {  //req.query.error == 'access_denied'
      res.send('access denied');
    }
    return;
  }

  // code is set
  // we'll send that and get the access token
  graph.authorize({
      "client_id":      conf.client_id
    , "redirect_uri":   conf.redirect_uri
    , "client_secret":  conf.client_secret
    , "code":           req.query.code
  }, function (err, facebookRes) {
    res.redirect('/UserHasLoggedIn');
  });


});

console.log("Node app is running at localhost:" + app.get('port'))

