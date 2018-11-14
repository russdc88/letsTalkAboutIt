$(document).ready(function () {
	// Getting jQuery references to the post body, title, form, and author select
	var userName = $("#username");
	var firstName = $("#firstName");
	var lastName = $("#lastName");
	var email = $("#email");
	var password = $("#password");
	var userImage = $("#userImage");

	
	// Adding an event listener for when the form is submitted
	$("#registerBtn").on("click", function(event) {

	var newUser = {
		userName: userName.val().trim(),
		firstName: firstName.val().trim(),
		lastName: lastName.val().trim(),
		email: email.val().trim(),
		password: password.val().trim(),
		userImage: userImage.val().trim()
	};
		event.preventDefault();
		// Wont submit the post if we are missing a body, title, or author
		// if (!userName.val().trim() || !firstName.val().trim() || !lastName.val().trim() || !email.val().trim() || !password.val().trim()) {
		// 	return;
		// }
		$.post("/api/createUser", { 
			newUser: newUser }, function(res) {
				console.log("this is the res from signUp.js", res); 
				 
				if (res.redirect){
					window.location.pathname = res.redirect
				}
			}

	)}); 

});
