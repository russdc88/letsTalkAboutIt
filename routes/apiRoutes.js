var db = require('../models');

module.exports = function (app) {
	// Get all examples
	app.get('/api/createUser', function (req, res) {
		db.Example.findAll({}).then(function (dbExamples) {
			res.json(dbExamples);
		});
	});

	app.post('/api/createUser', function (req, res) {
		db.User.create(req.body.userObj).then(function(dbUser) {
			req.session.user = dbUser.dataValues
			console.log(req.session)
			res.send({status:200}); 
		}).catch(function(err){
			res.send({status:500, error: err}); 
		})
	
	});

	// logging in

	app.post('/api/login', function(req,res) {
		console.log("hi")
		db.User.findOne({
			where: {
				userName: req.body.userName,
				password: req.body.password
			}
					
		}).then(function(dbUser) {
			console.log("hi")
			if(dbUser){
				console.log("this is req.session before changing authentication", req.session)
				req.session.authenticated = true;
				req.session.user = dbUser
				console.log("correct!")
				console.log("after auth",req.session)
				res.send({status:200, redirect: '/profile/' + dbUser.id}); 
			}

			else {
				console.log("wrong")
				res.send({status:404});
			}
		}).catch(function(err){
			res.send({status:500, error: err}); 
		})
	});

	// logging out

	app.post('/api/dashboard', function (req,res){
		if (req.session.authenticated = true){

			
			console.log(req.body);
			db.User.findOne({
				where: {
					id: req.params.id
				}
			}).then(function(dbUser){
				if (dbUser){
					
					req.session.authenticated = false;
					console.log("successfully logged out!", dbUser)
					console.log(req.session)
					res.send({status:200, redirect: '/login'})
				}
				
				else {
					console.log("did not sign out")
					res.send({status:404});
				}
			}).catch(function(err){
				res.send({status:500, error: err});
			})
		}

	})


	app.get("/api/loggedIn", function(req,res){
		console.log('hit')
		if(req.session.authenticated){
			res.send({
				authenticated: req.session.authenticated,
				user: req.session.user
			})
		}
		else {
			res.send({
				authenticated: false
			})
		}
	})


	app.get("/api/friends", function(req,res){
		db.User.findAll({})
		.then(function(allUsers){
			res.send({status:200, users: allUsers})
		})
	})
	

	// app.post('/api/updateProfile', function(req,res){
	// 	console.log(req.session)
	// 	if (!req.session.authenticated){
	// 		console.log("must be logged in!")
	// 		return
	// 	}

		// db.User.update(req.body,
		// 	{
		// 		where: {
		// 			id: req.session.user.id
		// 		}
		// 	})


	// })

	// Delete an example by id
	app.delete('/api/examples/:id', function (req, res) {
		db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
			res.json(dbExample);
		});
	});
};
