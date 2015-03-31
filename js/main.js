$(document).ready(function (){
  // smooth scrolling
  $(".smoothie").on('click', function(event) {
    var target = $(this.hash)
      , navOffset = $('#navbar').height()
	;

	console.log(target);

    return $('html, body')
		.animate(
			{ scrollTop: target.offset().top - navOffset },
			600,
			function() {
				return window.history.pushState(null, null, target.selector);
			}
		);
  });


  // create a LatLng object containing the coordinate for the center of the map
  var latlng = new google.maps.LatLng(37.795665,-122.276998);

  // prepare the map properties
  var options = {
    zoom: 15,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    navigationControl: true,
    mapTypeControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true
  };

  // initialize the map object
  var map = new google.maps.Map(document.getElementById('google_map'), options);

  // add Marker
  var marker1 = new google.maps.Marker({
    position: latlng, map: map
  });

  // add listener for a click on the pin
  google.maps.event.addListener(marker1, 'click', function() {
    infowindow.open(map, marker1);
  });

  // add information window
  var infowindow = new google.maps.InfoWindow({
    content:  '<div class="info"><h3>F\'Up Here</h3><strong>The Port Workspaces</strong><br><br>101 Broadway<br> Jack London Square, Oakland, CA</div>'
  });  
});

