var auth = {}

var socket;

var stringID;

var ownstringID;

var nsproom;

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


$("#currentUserId").on("click", function(event){
	event.preventDefault();

	$.post("/api/profile",{}, function(res){
		console.log(res);
		if(res.redirect) {
			window.location.pathname = res.redirect
		}
	})
})


$("#friendsList").on("click", ".friendFromFriendList", function(){
	//console.log(JSON.parse($(this).attr("data-user")).id)
	let socketID;
	var otherUserID = JSON.parse($(this).attr("data-user")).id;
	var ownUserID = auth.user.id;


	if (ownUserID == otherUserID){
		console.log("you can't chat with yourself!");
		$(ownUserID).hide();
		return;
	}

	if (ownUserID < otherUserID){
		console.log("more than yours")
		console.log(otherUserID);
		console.log(ownUserID);

		stringID = otherUserID.toString();

		ownstringID = ownUserID.toString();

		nsproom = stringID + "_" + ownstringID;

		console.log(nsproom);
		connectToSocket();
		return;

	}

	else if (otherUserID < ownUserID){
console.log("less than yours");
		console.log(otherUserID);
		console.log(ownUserID);

		stringID = otherUserID.toString();

		ownstringID = ownUserID.toString();
		
		nsproom = ownstringID + "_" + stringID;

		console.log(nsproom);
		connectToSocket();
		
		return;

	}else{console.log("notta"); return;}
	//sockets!!!!!!!!!!!!!
})

$("#formId").on("submit", function(event){
	event.preventDefault();
	socket.emit('chat', { message: $("#sendMessage").val(), userName: auth.user.userName });
	
})

$("#submitMessage").on("click", function (event) {
	event.preventDefault();

	socket.emit('chat', { message: $("#sendMessage").val(), userName: auth.user.userName });
	


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

function connectToSocket(){
	if(socket){
    socket.disconnect();
  }

	socket = io("/" + nsproom, {forceNew: true});
	$.post("/api/joinSocket",{nsproom:nsproom}, function(res){
		console.log(res);
		socket.on('chat', function(msg){
			console.log(msg.userName, auth.user.userName)
			if (msg.userName === auth.user.userName) {
				$('#messages').append($('<div class="row" style="background: pink; border-radius: 15px; color: black; width: 100%;"><p id="myMessage" style="background: blue; position:absolute; right:0px; green; width:50%; border-radius: 15px; color: white; padding: 10px 30px;">' + msg.message +'</p></div><br><br>'));
				
			}
			else {
				$('#messages').append($('<div class="row" style="background: white; border-radius: 15px; color: white; width: 100%;"><p id="myMessage" style="background: grey; width:50%; border-radius: 15px; color: white; padding: 10px 30px;">' + msg.message +'</p></div><br><br>'));
			}
			
    });
	})
}

console.log(nsproom);