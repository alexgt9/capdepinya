var express = require('express');
var router = express.Router();

var castellers = [
	{
		'id': '1',
		'name': 'Pepe'
	},
	{
		'id': '2',
		'name': 'Matu'
	},
	{
		'id': '3',
		'name': 'Candela'
	}
];

router.route('/')
	.get(function(request, response){
		response.json(castellers);
	})
	.post(function(request, response){
		var newCasteller = request.body;
		console.log(newCasteller);
		newCasteller.id = newCasteller.id || new Date().getTime();
		castellers.push(newCasteller);

		response.status(201).json(newCasteller);
	});

router.route('/:id')
	.all(function(request, response, next){
		request.castellerId = request.params.id;

		next();
	})
	.get(function(request, response){
		var found = castellers.filter(function(v) {
		    return v.id == request.castellerId;
		})[0];

		if (!found) {
			response.status(404).json("No casteller found with id " + request.castellerId);
		}else{
			response.json(found);
		}
	})
	.delete(function(request, response){
		var found = castellers.filter(function(v) {
		    return v.id == request.castellerId;
		})[0];

		if (found) {
			castellers = castellers.filter(function(v) {
			    return v.id != request.castellerId;
			});
			response.sendStatus(200);
		}else{
			response.status(404).json("Casteller not found");
		}
	});

module.exports = router;