
var io = require('socket.io').listen(server);

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
    io.in('chat').emit('join', {alias: user[socket.client].alias});

    socket.on('msg', function(msg){
        io.emit('msg', msg);
    });

    socket.on('disconnect', function() {
        socket.broadcast.to('chat').emit('leave', {alias: user[socket.client].alias});
    });

})