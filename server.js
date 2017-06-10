var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var emoji = require('node-emoji')
var regExp = /\(([^)]+)\)/;


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        var matches = regExp.exec(msg);
        var tr =  msg;
        var a = msg.replace(/[(),]/g, "::") 
        io.emit('chat message', emoji.emojify(a));
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});