  // Create a map centered on NYC
  var map = L.map('map').setView([40.731649,-73.977814], 10);
  
  // Add a base layer. We're using Stamen's Toner:
  //  http://maps.stamen.com/#toner
L.mapbox.accessToken = 'pk.eyJ1IjoiYms3NDEiLCJhIjoiZFNVcTNvdyJ9.h8G4i4ib7PicRCiejvZW6g';
// Replace 'examples.map-i87786ca' with your map id.
var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/bk741.09c0a8ed/{z}/{x}/{y}.png').addTo(map);
  

$("#text").hide();

$.getJSON('https://bk741.cartodb.com/api/v2/sql?q=select distinct(borough)%20from%20graffiti_information_2015', function(data) {
 
  	$.each(data.rows, function() {
  	$('#boroughs').append(
		"<input type = 'submit' class = 'borough, two columns' value='"
		+ this.borough
		+ "'>" 
		+"</input>");
 
});

});
var geoJsonLayer = L.geoJson(null).addTo(map);

  var id;
  $(document).on("click", "input", function (event) {
      //should not not var here, using var here will declare the variable id as a local variable in the handler function scope
      id = $(this).attr('value') || '';
      $("#text").show();
      	$('#name').prev().remove('span')
	$("#name").before('<span>'+id+'</span>');
      console.log(id);
	geoJsonLayer.clearLayers();

    $.getJSON(based+id+dend, function(data) {
  	$.each(data.rows, function(key, val) {
  	$('#district').append($("<li></li>")).text(this.count);
  	
	 $.getJSON(base+id+gend)
	  	// When it's done, add the results to the map
	    .done(function (data) {
	      geoJsonLayer.addData(data)   
	    });
	});
  	});

});

  $(function () {
      $(".borough").click(function (e) {
          console.log(id);
      
	});
	});


var based =  'https://bk741.cartodb.com/api/v2/sql?q=select%20count(borough)%20from%20graffiti_information_2015%20where%20borough%20in%20(%27'
var dend = '%27)'

var base = 'https://bk741.cartodb.com/api/v2/sql?q=select*from%20graffiti_information_2015%20where%20borough%20in%20(%27'
var gend = '%27)&format=GeoJson'








