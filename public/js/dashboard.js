// console.log("hi")

// $("#signOut").on("click", function(event){
// 	event.preventDefault();

// 	console.log("Working!!!")

// 		var userId = window.location.split("/")[2]

// 	$.post("/api/dashboard/" + userId , {id: userId}, function (res){
// 		console.log(res);
// 		if (res.redirect){
// 			window.location.pathname = res.redirect;
// 		}
// 	}) 


// })

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});