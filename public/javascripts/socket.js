$(function() {

  // Sets a console message if in debugging mode.
  f.initSocket = function () {
    var socket = io.connect('http://localhost')

    socket.on('action', function (action) {
      if (action.object) {
        f[action.action](action.object)
      }
      else {
        f[action.action]()
      }
    })
  }

})
