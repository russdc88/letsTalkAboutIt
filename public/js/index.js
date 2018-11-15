// will login user with username and password. is sent over to apiRoutes.js as a post
$("#loginBtn").on("click", function (event) {
	event.preventDefault();

//use jquery to grab values
let userName = $("#splashFormName").val().trim()
let password = $("#splashFormPassword").val()

	$.post("/api/login" , { userName: userName, password: password}, function (res) {
		
		if (res.redirect) {
			window.location.pathname = res.redirect; 
		}

		else {
			$('.modal').modal('show')
		}


		//insert modal to communicate with user on 200 or 500 status if/else res.status

	})

})


























