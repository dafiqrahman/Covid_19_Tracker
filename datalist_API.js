$(document).ready(function () { 
  var key = config.KEY_token;
  var host = config.host;
  const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://covid-193.p.rapidapi.com/countries",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": host,
		"x-rapidapi-key": key
	}
};

    $.ajax(settings)
    .done(function (response) {
	    var data = response.response
          $( function() { 
            $( ".input" ).autocomplete({
      source: data
    });
  } );        
    })
    .fail(function (error) {
        console.log(error);
        });
})