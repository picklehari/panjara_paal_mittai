var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));
users = []
// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);
    users.push(socket.id)
    if(users.length > 1){
        io.sockets.connected[users[0]].join("roomA");
        io.sockets.connected[users[1]].join("roomA");
    }
    else{
        io.sockets.connected[users[0]].join("roomA");
    }
    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        //io.sockets[i].emit('chat', data);
        io.in("roomA").emit('chat',data)
    });

    // Handle typing event
    socket.on('typing', function(data){
        io.to("roomA").emit('typing', data);
    });

});