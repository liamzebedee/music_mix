// libs
var PORT    = process.env.PORT || 5000;

var express = require('express');
var app     = express();
var server  = app.listen(PORT);
var io      = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

var user = {};
var message = [];

// io.on('connection', function(socket) {

//     if (!user[socket.id]) {
//         user[socket.id] = {
//             name: Math.floor(Math.random()*1000),
//         }
//     }

//     socket.join('chat');

//     socket.on('join', function(obj) {
//         socket.broadcast.to('chat').emit('join', {name: user[socket.id].name});
//     })

//     socket.on('message', function(obj){
//         io.emit('message', {name: user[socket.id].name, message: obj.message});
//     });

//     socket.on('disconnect', function() {
//         socket.broadcast.to('chat').emit('disconnect', {name: user[socket.id].name});
//     });

// })

// internals

// var lhChat = require('./chat.js');
var lhNearMe = require('./findNearMe.js');
var fbLogin = require('./fbLogin.js');

// io.on('connection', function(socket) {
//     // console.log(socket.client);
//     // lhChat.new(socket);
// })

// routing
app.get('/login/', function(request, response) {
    fbLogin.process(request, response);
});

app.get('/find_near_me', function(request, response) {
    lhNearMe.process(request, response);
});

console.log("Node app is running at localhost:" + app.get('port'));