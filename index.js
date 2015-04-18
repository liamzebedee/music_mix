
// config

var PORT = process.env.PORT || 5000;

// libraries

var express = require('express');
var app 	= express();
var server 	= app.listen(PORT);
var io		= require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

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

console.log("Node app is running at localhost:" + app.get('port'))

