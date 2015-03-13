var express = require('express');
var favicon = require('serve-favicon');
var app = express();
var bodyParser = require('body-parser');

var logger = require('./logger');
app.use(logger);

app.use(express.static('public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var castellers = require('./routes/castellers');
app.use('/castellers', castellers);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, ipaddress, function(){
	console.log('Running Express');
});
