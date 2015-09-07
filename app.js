/*jslint nomen: true */
/*global require, process, __dirname, console*/
var express = require('express'),
	app		= express(),
	port	= process.env.PORT || 8080;

// ## ROUTES ##
require('./routes')(app);

// ## LOAD ##
app.listen(port);
console.log('Listening on port ' + port);