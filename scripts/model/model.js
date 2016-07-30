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
    //console.log(data);
    getPlace(data);
    }
}).done(function(data){
  // pass
});

function getPlace (places) {
  places.map(function(current) {
    getPlaceInfo();
  });
};

var getPlaceInfo = function (currentPlace) {
  var place = {
    directions: currentPlace.directions,
    location: {
      lat: currentPlace.lat,
      long: currentPlace.lon
    }
    activities: getActivities(currentActivity);
  }
  console.log(place);
  placeholder.push(place);
};

var getActivities = function (currentActivity) {
  var result = {
    activitiy: currentActivity.activity_type_name,
    length: currentActivity.length,
    description: currentActivity.description
};
