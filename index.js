// libs
var PORT    = process.env.PORT || 5000;

var express = require('express');
var app     = express();
var server  = app.listen(PORT);
var io      = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

var user = {};
var message = [];

io.on('connection', function(socket) {

    if ( !user[socket.client] ) {

        user[socket.client] = {
            alias: '' + Math.random()*1000,
            online: true,
        }

    }

    if ( !user[socket.client].online ) {
        user[socket.client].online = true;
    }

    socket.join('chat');
    io.in('chat').emit('join', {user: user[socket.client].alias});

    socket.on('msg', function(msg){
        io.emit('msg', {user: user[socket.client].alias, msg: msg});
    });

    socket.on('disconnect', function() {
        socket.broadcast.to('chat').emit('leave', {user: user[socket.client].alias});
    });

})

// config

// app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

var conf = {
    client_id:      '474840302668268'
  , client_secret:  'f0613480861a06dc54ac517b5730d5c4'
  , scope:          'email, user_about_me'
  , redirect_uri:   'http://listenhere.herokuapp.com/auth/facebook'
};

// constants

var PARSE_APP_ID = '6g5rdM4QiKNQwXMCrr8tvEuHpad7mdYsjbgLRUhA';
var PARSE_JS_KEY = 'KKRi6LU0KSyfVuKxA7xjfVTBCUpKg8vNVdjEyZGz';

// internals

// var lhChat = require('./chat.js');
var lhNearMe = require('./findNearMe.js');
var fbLogin = require('./fbLogin.js');

io.on('connection', function(socket) {
    console.log(socket.client);
    // lhChat.new(socket);
})

// routing

app.get('/', function(request, response) {
    response.send('/hack');
});

app.get('/auth/facebook', function(request, response) {
    fbLogin.process(request, response);
});

app.get('/find_near_me', function(request, response) {
    lhNearMe.process(request, response);
});

console.log("Node app is running at localhost:" + app.get('port'))

