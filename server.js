require('dotenv').config();
var express = require('express');
var exphbs = require('express-handlebars');
var session = require('express-session');
// let config = require('./config.js')
const bodyParser = require('body-parser');
let spaces = {};

var db = require('./models');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var PORT = process.env.PORT || 3000;
// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
	secret: process.env.secret,
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: (1000*60*60*24*14) }
}))

app.use(express.static('public'));
// Handlebars
app.engine(
	'handlebars',
	exphbs({
		defaultLayout: 'main'
	})
);
app.set('view engine', 'handlebars');

// Routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
	syncOptions.force = true;
}
app.get("/api/friends", function(req,res){
	db.User.findAll({})
	.then(function(allUsers){
		res.send({status:200, users: allUsers})
	})
})

app.post("/api/joinSocket", function(req, res){
	let nsp = req.body.nsproom
	if(!spaces[nsp]){

		console.log('new room created')
		spaces[nsp] = io.of('/' + nsp)

		spaces[nsp].on('connection', function(socket){
			console.log('someone connected');
			console.log(socket);
			socket.on('disconnect', function(){
				console.log('user disconnected');
			})

			socket.on('chat', function(msg){
				spaces[nsp].emit('chat', msg);
			})

			socket.on('call peer', function(data){
				spaces[nsp].emit('call peer', data)
			})

			socket.on('answer peer', function(data){
				spaces[nsp].emit('answer peer', data)
			})
		});

		res.send({status:200})

	} else {

		console.log('room already exists')
		res.send({status:200})

	}
})


// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
	http.listen(PORT, '0.0.0.0', function() {
		console.log('Listening to port:  ' + PORT);
	});

});

// socket.io


// io.on('connection', function(socket){
// 		console.log('user connected')

// 		let userChats = io.connect("http://localhost:3000/dashboard");
		
// 		userChats.on('chat', function(msg){
// 			console.log("message:" + msg.message)
// 		})
//   });







module.exports = app;
//socket.io server code

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
		io.emit('chat message', msg);
		io.emit("welcome", "hello")
		console.log(socket.connected);
  });
});
//namespace connections
io.of("/dashboard/insertidshere").on("connection", (socket) => {

	io.emit("welcome");

})

http.listen(3000, () => {
	console.log("server is listening on localhost:3000")
});
