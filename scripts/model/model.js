var baseUrl = 'https://trailapi-trailapi.p.mashape.com/';
var authKey = 'KLpWSysVJTmshDzPyETfAf7t3KLhp1enYfsjsnb8fX4wPIx2Wd';
var acceptType = 'text/plain';
var placeholder = [];

function lookupPlace(lat, lng){
  var dynamicUrl = baseUrl + '?lat=' + lat + '&lon=' + lng + '&q[activities_activity_type_name_eq]=hiking&limit=25&radius=25';
  $.ajax({
    url: dynamicUrl,
    type: 'GET',
    headers: {
      'X-Mashape-Key': authKey,
      'Accept' : acceptType
    },
    success: function(data, message, xhr) {
      data.map(getPlace(data));
      console.log(data);
    }
  }).done(function(data){
  });
}

function getPlace(data) {
  for (var i = 0; i < data.places.length; i++) {
    getPlaceInfo(data.places[i]);
  }
};

var getPlaceInfo = function (currentPlace) {
  // loop activies array
  for (var j = 0; j < currentPlace.activities.length; j++) {
    var currentActivity = currentPlace.activities[j];
    var activity_type = currentActivity.activity_type_name;
    var description = currentActivity.description;
    var activityLength = currentActivity['length']; // use bracket b/c 'length' is reserved
    console.log(description);
  }
};

var getActivities = function (currentActivity) {
  var result = {
    activitiy: currentActivity.activity_type_name,
    length: currentActivity.length,
    description: currentActivity.description
  };
};

function getLatLng(zipCode) {
  $.ajax({
    url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + zipCode,
    type: 'GET',
  }).always(function(data){
    if (data.status == 'OK') {
      var results = data.results;
      if (results.length >= 1) {
        var geoResult = results[0];
        lookupPlace(geoResult.geometry.location.lat, geoResult.geometry.location.lng);
      }
    }
  });
}

getLatLng('98104');
