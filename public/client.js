$(function(){
	$.get('/castellers', appendToList);

	function appendToList (castellers) {
		var list = [];
		var content, casteller;
		for(var castellerId in castellers){
			casteller = castellers[castellerId];
			content = '<a href="/castellers/'+castellerId+'">'+casteller.name+'</a>'+
				'  <a href="#" data-casteller="'+castellerId+'">x</a>';
			list.push($('<li>', {html: content}));
		}
		$('.castellers-list').append(list);
	}

	$('form').on('submit', function(event){
		event.preventDefault();
		var form = $(this);
		var castellerData = form.serialize();

		$.ajax({
			type: 'POST', url: '/castellers', data: castellerData
		}).done(function(casteller){
			var newCasteleller = {};
			newCasteleller[casteller.id] = casteller;
			console.log(casteller);

			appendToList(newCasteleller);
			form.trigger('reset');
		});
	});

	$('.castellers-list').on('click', 'a[data-casteller]', function(event){
		if (!confirm('Are you sure')) {
			return false;
		}

		var target = $(event.currentTarget);

		$.ajax({
			type: 'DELETE', url: '/castellers/'+target.data('casteller')
		}).done(function(){
			target.parents('li').remove();
		});
	});
});