// Socket.io server.
var io = require('socket.io').listen(app.listen(port))
var sioCookieParser = express.cookieParser(objects.secret);

io.sockets.on('connection', function (socket) {
  sioCookieParser(socket.handshake, {}, function(err) {
    
    // Parsed cookies are now in socket.handshake.cookies
    var sessionID = socket.handshake.signedCookies['connect.sid']
    console.log('sessionID: ' + sessionID)
  });

  // socket.emit('message', { message: 'welcome to the chat' });
  socket.on('logged-in', function (data) {
    // console.log(data)
  })

  socket.on('disconnect', function() {
    // console.log(socket.id)
  })
})
