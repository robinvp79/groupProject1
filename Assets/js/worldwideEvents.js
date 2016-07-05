$(document).ready(function(){
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
  var validateWhere = where.value;
  var validateQuantity = quantity.value;
  if (validateQuery==null || validateQuery=="" || validateQuantity==null || validateQuantity=="" || validateDateBegin==null || validateDateBegin=="" || validateDateEnd==null || validateDateEnd=="" || validateWhere==null || validateWhere=="") {
    return(null);
  } else {
    return(true);
  }
}

$('#worldwideForm').on('submit',function(){
  $('#eventsInfo').empty();
  var validateFormValue = validateForm();
  if (validateFormValue == null) {
    function warning() {
      notie.alert(2, 'Please fill out all the fields<br>Thanks', 5);
    };
    warning();
    var p = $('<p>',{
      text:"Please fill out all the fields",
    });
    p.addClass('fillFields');
    $('#eventsInfo').append(p);
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
    where: where.value, 
    "date": inputDate,
    page_size: quantity.value,
    sort_order: "popularity",
    };

   	EVDB.API.call("/events/search", oArgs, function(oData) {
    	console.log(oData);
    	var resultsVerification=oData.events;
      $('#eventsInfo').empty();
    	if (resultsVerification){
      	function success() {
          notie.alert(1, 'Yeee... We found your event...', 3);
        }
      	success();
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
        			text:"Check Out This Event Here ",
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
        		$('#eventsInfo').append(resultsDiv);
      	}
    	}else{
        function error() {
          notie.alert(3, 'Sorry, we could not find results for your search, please try again. Thanks', 5);
        };
        error();
      	$('#eventsInfo').empty();
      	var p = $('<p>',{
          		text:"NO RESULTS",
        })
        p.addClass('noResults');
        $('#eventsInfo').append(p);
    	}
    });
  }
	return false;
})
});