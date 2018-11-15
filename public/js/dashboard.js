var socket = io();

$("#submitMessage").on("click", function (event) {
	event.preventDefault();
	socket.emit('chat', { message: "hi" })

// 	console.log("Working!!!")

// 		var userId = window.location.split("/")[2]

// 	$.post("/api/dashboard/" + userId , {id: userId}, function (res){
// 		console.log(res);
// 		if (res.redirect){
// 			window.location.pathname = res.redirect;
// 		}
// 	}) 


// })

})	
