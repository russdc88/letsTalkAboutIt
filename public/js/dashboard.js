var auth = {}

$.get( "/api/loggedIn", function( data ) {
	if (!data.authenticated){
		window.location.pathname = "/login"
		return
	}
	auth = data
	$("#welcome").text('Welcome ' + auth.user.userName + "!")
	getFriends()
  console.log(data)
});

function getFriends(){
	$.get("/api/friends", function(data){
		console.log(data)
		for (var i =0; i<data.users.length; i++){
			let friend = $("<div>")
			friend.addClass("friendFromFriendList").attr("data-user", JSON.stringify(data.users[i]))
			let image = $("<img>").attr("src", data.users[i].userImage).attr("width" , "40px")
			let name = $("<p>").text(data.users[i].firstName)

			friend.append(image).append(name)
			$("#friendsList").append(friend)

		}
		

	})
}


$("#friendsList").on("click", ".friendFromFriendList", function(){
	console.log(JSON.parse($(this).attr("data-user")).id)
	let socketID;
	
	console.log(auth.user.id);
	//sockets!!!!!!!!!!!!!
})

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
