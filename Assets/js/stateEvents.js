$('#stateForm').on('submit',function(){
	$('#eventsInfo').empty();
	var stateSelected = $('#state option:selected').val();
	console.log(stateSelected);
	var queryURL = "https://api.seatgeek.com/2/venues?state="+stateSelected+"&client_id=NTA2NDU2NHwxNDY2ODcyMDAy";
	$.ajax({url: queryURL, method: 'GET'}).done(function(response){
		console.log(response);
		var results = response.venues;
		for (var i = 0; i < results.length; i++) {
			var checkEvent=results[i].stats.event_count;
			if (checkEvent) {
				var statesDiv = $('<div>');
				console.log(results[i]);
				var p = $('<p>',{
					text:"Location: "+results[i].name
				});
				statesDiv.append(p);
				var p = $('<p>',{
					text:"Event Address: "+results[i].address+results[i].extended_address
				});
				statesDiv.append(p);
				var p = $('<p>',{
					text:"Events Quantity: "+results[i].stats.event_count
				});
				statesDiv.append(p);
				var a =$('<a>',{
					href:results[i].url,
					text:"Check Out the Events at this Location"
				})
				statesDiv.append(a);
				var p =$('<p>',{
					text:"**************************************************************"
				})
				statesDiv.append(p);
				var p =$('<p>',{
					text:"**************************************************************"
				})
				statesDiv.append(p);
				$('#eventsInfo').append(statesDiv);
			}
		}
	})
	return false;
});