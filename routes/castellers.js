var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var castellers = {
	'1': {
		'name': 'Pepe',
	},
	'2': {
		'name': 'Matu',
	},
	'3': {
		'name': 'Candela',
	}
};

router.route('/')
	.get(function(request, response){
		response.json(castellers);
	})
	.post(parseUrlencoded, function(request, response){
		var newCasteller = request.body;
		newCasteller.id = new Date().getTime();
		castellers[newCasteller.id] = {
			'name': newCasteller.name,
		};

		response.status(201).json(newCasteller);
	});

router.route('/:id')
	.all(function(request, response, next){
		request.castellerId = request.params.id;

		next();
	})
	.get(function(request, response){
		var name = castellers[request.castellerId];
		console.log(request.castellerId);
		if (!name) {
			response.status(404).json("No casteller found with id " + request.castellerId);
		}else{
			response.json(name);
		}
	})
	.delete(function(request, response){
		if (castellers[request.castellerId]) {
			delete castellers[request.castellerId];
			response.sendStatus(200);
		}else{
			response.status(404).json("Casteller not found");
		}
	});

module.exports = router;