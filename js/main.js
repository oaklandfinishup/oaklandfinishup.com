$(document).ready(function (){
  // smooth scrolling
  $("#topnav li a[href^='#']").on('click', function(event) {
    var target;
    target = this.hash;

    event.preventDefault();

    var navOffset;
    navOffset = $('#navbar').height();

    return $('html, body').animate({
      scrollTop: $(this.hash).offset().top - navOffset
    }, 300, function() {
      return window.history.pushState(null, null, target);
    });
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
    content:  '<div class="info"><strong>The Port Workspaces</strong><br><br>101 Broadway<br> Jack London Square, Oakland, CA</div>'
  });  
});

