// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the button 2 that opens the modal
var btn2 = document.getElementById("myBtn2");

// Get the button 3 that opens the modal
var btn3 = document.getElementById("myBtn3");

// Get the button 4 that opens the modal
var btn4 = document.getElementById("myBtn4");

// Get the button 5 that opens the modal
var btn5 = document.getElementById("myBtn5");

// Get the button 6 that opens the modal
var btn6 = document.getElementById("myBtn6");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the state search button, open the modal with the event results
btn.onclick = function() {
  modal.style.display = "block";
  $('#finalEventResults').empty();
  var queryURL = "https://api.seatgeek.com/2/venues?state=NY&client_id=NTA2NDU2NHwxNDY2ODcyMDAy";
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
				$('#finalEventResults').append(statesDiv);
			}
		}
	})
  return false;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//This function convert the user date from the form to valid date for the API
function convertDate(dateString){
	var dateArray = dateString.split("-");
  	console.log(dateArray);
  	var dateJoined = dateArray.join("");
  	console.log(dateJoined);
  	var resultDate=dateJoined+"00";
  	console.log(resultDate);
  	return(resultDate);
}

//This function validate that all fields in the form are filled out
function validateForm(){
  var validateDateBegin = dateBegin.value;
  var validateDateEnd = dateEnd.value;
  var validateQuery = query.value;
  var validateQuantity = quantity.value;
  if (validateQuery==null || validateQuery=="" || validateQuantity==null || validateQuantity=="" || validateDateBegin==null || validateDateBegin=="" || validateDateEnd==null ||validateDateEnd=="") {
    return(null);
  } else {
    return(true);
  }
}

//When the user clicks on the NYC Form, open the modal with the event results
$('#nycForm').on('submit',function(){
  $('#finalEventResults').empty();
	modal.style.display = "block";
  var validateFormValue = validateForm();
  if (validateFormValue == null) {
    var p = $('<p>',{
      text:"PLEASE FILL OUT ALL THE FIELDS",
    });
    p.addClass('fillFields');
    $('#finalEventResults').append(p);
  } else {
	  console.log(dateBegin.value);
  	var begin = dateBegin.value;
  	var initialDate=convertDate(begin);
  	console.log(dateEnd.value);
  	var end = dateEnd.value;
  	var finalDate=convertDate(dateEnd.value);
  	var inputDate=initialDate+"-"+finalDate;
  	console.log(inputDate);

  	var oArgs = {
  		app_key: "BNC5TfKMt8nqQmcd",
  		q: query.value,
  		where: "New York City", 
  		"date": inputDate,
  		page_size: quantity.value,
  		sort_order: "popularity",
  	};

  	EVDB.API.call("/events/search", oArgs, function(oData) {
    	console.log(oData);
    	var resultsVerification=oData.events;
    	if (resultsVerification){
      	var results =oData.events.event;
      	for (var i = 0; i < results.length; i++) {
        	var resultsDiv = $('<div>');
        	resultsDiv.addClass('oderResults');
        	if (results[i].image){
          	var resultImage = $('<img>',{
          		src:results[i].image.medium.url,
          		alt:results[i].title
          	});
          	resultsDiv.append(resultImage);
          }
        	var p = $('<p>',{
          	text:"Name : "+results[i].title
        	});
        	resultsDiv.append(p);
        	var p = $('<p>',{
          	text:"Start Time : "+results[i].start_time
        	});
        	resultsDiv.append(p);
        	var p = $('<p>',{
          	text:"Place : "+results[i].venue_name
        	});
        	resultsDiv.append(p);
        	var p = $('<p>',{
          	text:"Address : "+results[i].venue_address+" / "+results[i].city_name+", "+results[i].region_name+"  "+results[i].postal_code
        	});
        	resultsDiv.append(p);
        	if (results[i].description){
          	var p = $('<p>',{
          		text:"Description of the Event : "+results[i].description
          	});
          	resultsDiv.append(p);
        	}
        	var a =$('<a>',{
        		href:results[i].url,
        		text:"Check Out This Event Here",
        		width: 200
        	});
        	resultsDiv.append(a);
        	var p = $('<p>',{
          	text:"OR"
        	});
        	resultsDiv.append(p);
        	var a =$('<a>',{
        		href:results[i].venue_url,
        		text:"Check Out At This Venue Here"
        	});
        	resultsDiv.append(a);
        	var performersRes = results[i].performers;
        	console.log(performersRes);
        	if (performersRes) {
          	var performersResObj = performersRes.performer;
          	console.log(performersResObj.length);
          	if (performersResObj.length){
            	for (var j = 0; j < performersResObj.length; j++) {
              	var p = $('<p>',{
              		text:"OR"
              	});
              	resultsDiv.append(p);
              	var a =$('<a>',{
              		href:performersResObj[j].url,
              		text:"Check Out For "+performersResObj[j].name+" Here"
              	});
              	resultsDiv.append(a);
              	if (performersResObj[j].short_bio) {
                	var p = $('<p>',{
                		text:"Short Description of "+performersResObj[j].name+" : "+performersResObj[j].short_bio
                	});
                	resultsDiv.append(p);
              	}
            	}
          	}else{
              var p = $('<p>',{
              	text:"OR"
              });
              resultsDiv.append(p);
              var a =$('<a>',{
              	href:performersRes.performer.url,
              	text:"Check Out For "+performersRes.performer.name+" Here"
              });
            	resultsDiv.append(a);
              if (performersRes.performer.short_bio) {
                var p = $('<p>',{
                	text:"Short Description of "+performersRes.performer.name+" : "+performersRes.performer.short_bio
                });
                resultsDiv.append(p);
              }
            }
        	};
        	var p = $('<p>',{
          	text:"************************************"
        	});
        	resultsDiv.append(p);
        	var p = $('<p>',{
          	text:"************************************"
        	})
        	resultsDiv.append(p);
        	$('#finalEventResults').append(resultsDiv);
        }
      }else{
        $('#finalEventResults').empty();
        var p = $('<p>',{
          text:"Sorry, we could not find results for your search, please try again."
        });
        $('#finalEventResults').append(p);
      }
    });
  };
	return false;
});

btn2.onclick = function() {
  modal.style.display = "block";
  $('#finalEventResults').empty();
  var nycImage = $('<img>',{
    src:"Assets/Images/NYBrooklynBridge.jpg",
    alt:"Brooklyn Bridge"
  });
  $('#finalEventResults').append(nycImage);
  return false;
};

btn3.onclick = function() {
  modal.style.display = "block";
  $('#finalEventResults').empty();
  var nycImage = $('<img>',{
    src:"Assets/Images/NYCentralPark.jpg",
    alt:"Central Park"
  });
  $('#finalEventResults').append(nycImage);
  return false;
};

btn4.onclick = function() {
  modal.style.display = "block";
  $('#finalEventResults').empty();
  var nycImage = $('<img>',{
    src:"Assets/Images/NYEmpireState.jpg",
    alt:"Empire State Building"
  });
  $('#finalEventResults').append(nycImage);
  return false;
};

btn5.onclick = function() {
  modal.style.display = "block";
  $('#finalEventResults').empty();
  var nycImage = $('<img>',{
    src:"Assets/Images/NYStatueOfLiberty.jpg",
    alt:"Statue of Liberty"
  });
  $('#finalEventResults').append(nycImage);
  return false;
};

btn6.onclick = function() {
  modal.style.display = "block";
  $('#finalEventResults').empty();
  var nycImage = $('<img>',{
    src:"Assets/Images/NYTimesSquare.jpg",
    alt:"Times Square"
  });
  $('#finalEventResults').append(nycImage);
  return false;
};