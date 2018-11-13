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
			req.session.authenticated = true;
			console.log(req.session)
			res.send({status:200}); 
		}).catch(function(err){
			res.send({status:500, error: err}); 
		})
	
	
	});

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
