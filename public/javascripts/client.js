window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://localhost:3000');
 
    socket.on('message', function (data) {
        if(data.message) {
            console.log(data)
        } else {
            console.log("There is a problem:", data);
        }
    });
 
}