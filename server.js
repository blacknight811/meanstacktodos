// set up =============================
var express         = require('express');
var app             = express();                    // create express app
var mongoose        = require('mongoose');          // mongoose for mongodb
var morgan          = require('morgan');            // log requests to the console (express)
var bodyParser      = require('body-parser');       // pull info from HTML POST (express)
var methodOverride  = require('method-override');   // simulate DELETE and PUT (express)
var dotenv          = require('dotenv').config();   // manage local environment variables
var database        = require('./config/database');        // load the database config



// configuration ======================
mongoose.connect(database.url); //connect to mongoDB on mongoLab

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

// load the routes ====================
require('./app/routes')(app);

// listen (start app with node server.js)
app.listen(process.env.PORT);
console.log('App listening on port '+ process.env.PORT);