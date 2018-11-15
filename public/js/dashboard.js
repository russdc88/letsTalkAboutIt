var socket = io();

$("#submitMessage").on("click", function (event) {
	event.preventDefault();
	socket.emit('chat', { message: "hi" })

})	