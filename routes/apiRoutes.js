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

	// Delete an example by id
	app.delete('/api/examples/:id', function (req, res) {
		db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
			res.json(dbExample);
		});
	});
};
