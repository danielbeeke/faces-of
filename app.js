var compass = require('compass');
var twig = require('twig');
var express = require("express");
var app = express();
var port = 3000;
 
app.use(compass({ cwd: __dirname + '/' }));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index.twig', {
    message : "Hello World"
  });
});
 
var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});