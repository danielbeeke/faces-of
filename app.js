// Config and requirements.
var twig = require('twig')
var express = require("express")
var app = express()
var port = 3000

// Compiles compass on the fly, slows it down.
var compass = require('compass') 
app.use(compass({ cwd: __dirname + '/' }))

app.use(express.static(__dirname + '/bower_components'))
app.use(express.static(__dirname + '/public'))

// Index html.
app.get('/', function(req, res){
  res.render('index.twig')
})

// Socket.io server.
var io = require('socket.io').listen(app.listen(port))

io.sockets.on('connection', function (socket) {
    // socket.emit('message', { message: 'welcome to the chat' });

    socket.on('loggedIn', function (data) {
      console.log(socket.id)
    })

    socket.on('disconnect', function() {
      console.log(socket.id)
    })
})
