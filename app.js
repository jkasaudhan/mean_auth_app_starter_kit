var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var userRouter = require('./routes/userRouter');
var config = require('./config/database');
var passport = require('passport');

//To allow cross browser request on developement machine
var cors = require('cors');

//For database
var mongoose = require('mongoose');
mongoose.connect(config.dbConnectionString);

mongoose.connection.on('connected', function() {
    console.log('Connected to database: ', config.dbConnectionString);
});

//For user authentication
var passport = require('passport');

//Initialize main nodejs server app
var app = express();

var port = process.env.port || 3000;

//Use middlewares
app.use(bodyParser.json());// for parsing application/json
app.use(bodyParser.urlencoded({extended: true}));// for parsing application/x-www-form-urlencoded

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//Use passport authentication startegy
require('./config/passport')(passport);
//use middleware cors to allow cross origin request for local developement
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function() {
    console.log("Node server started...");
});

app.get('/', function(req, res) {
    res.send('Conntected to server.');
});


//Deligate all the routes associated with user to userRouter
app.use('/api/v1/users', userRouter);