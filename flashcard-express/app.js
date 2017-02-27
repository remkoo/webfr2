"use strict";

/*
// Initial version
var http = require('http');
var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});
server.listen(8000);
*/


/*
// Add ES6
const http = require('http');
var server = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello ES6-World\n");
});
server.listen(8000);
*/

/*
// Add Logging
const http = require('http');
const log4js = require('log4js');

let logger = log4js.getLogger('App');
log4js.configure('log4js.json');

var server = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello ES6-World\n");
});
server.listen(8000);
logger.info(`Server running on port 8000`);
*/

const log4js = require('log4js');
const dotenv = require('dotenv-extended');
const express = require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dispatcher = require('./web/questionnaire-controller');
const Questionnaire = require('./domain/questionnaire');

let logger = log4js.getLogger('App');
log4js.configure('log4js.json');

// Read the properties from file '.env' and '.env.defaults'
dotenv.load({silent: true});
let PORT = process.env.PORT || 9090;

// Connect to the database using the connection parameters found in the property-files
let url = 'mongodb://' + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE;
logger.debug(`Database URL used "${url}"`);
mongoose.connect(url, {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS
});

// Create the Express Server App
var app = express()

// Configure body-parser. The parser handles the JSON payload.
app.use(bodyParser.json());

// Enable CORS (for all requests)
app.use(cors());

// Configure the dispatcher with all its routes
app.use('/flashcard-express', dispatcher);

app.listen(PORT)

// Put a friendly message on the terminal
logger.info(`Server running at ${PORT}`);

module.exports = app;