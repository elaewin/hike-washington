// var baseUrl = 'https://ridb.recreation.gov/api/v1/';
// var authParam = '?apikey=300070357BB44A5E840841EEB4552CE8';
var baseUrl = 'https://trailapi-trailapi.p.mashape.com/';
var authKey = 'KLpWSysVJTmshDzPyETfAf7t3KLhp1enYfsjsnb8fX4wPIx2Wd';
var acceptType = 'text/plain';
var placeholder = [];

$.ajax({
  url: baseUrl + '?q[state_cont]=Washington' + '&limit=25',
  type: 'GET',
  headers: {
    'X-Mashape-Key': authKey,
    'Accept' : acceptType
  },
  success: function(data, message, xhr) {
    data.map(getPlace(data));
    //console.log(data);
  }
}).done(function(data){
  // pass
});

function getPlace(data) {
  // loop places array
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
    console.log(activityLength);
    console.log(description);
    console.log(activity_type);
    console.log(currentActivity);
  }
  //console.log(currentPlace);
  /*
  var place = {
    directions: currentPlace.directions,
    location: {
      lat: currentPlace.lat,
      long: currentPlace.lon
    }
    // activities: currentPlace.activities.map(function(currentActivity) {
    //   getActivities(currentActivity);
    // };
  };
  console.log(place);
  placeholder.push(place);
  */
};

var getActivities = function (currentActivity) {
  var result = {
    activitiy: currentActivity.activity_type_name,
    length: currentActivity.length,
    description: currentActivity.description
  };
};
