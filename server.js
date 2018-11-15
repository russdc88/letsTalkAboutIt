require('dotenv').config();
var express = require('express');
var exphbs = require('express-handlebars');
var session = require('express-session');
let config = require('./config.js')
const bodyParser = require('body-parser');

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
	secret: config.secret,
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



// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
	 http.listen(PORT, function () {
		console.log(
			'==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
			PORT,
			PORT
		);
	});

});

// socket.io

io.on('connection', function(socket){
		console.log('user connected')
		
		socket.on('chat', function(msg){
			console.log("message:" + msg.message)
		})
  });







module.exports = app;
