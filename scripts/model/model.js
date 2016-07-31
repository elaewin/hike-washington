(function(module) {
  var modelHikes = {};
// Make variable names more self-explainatory!
  modelHikes.placeholder = []; //array used to store Hikes as objects

  modelHikes.callTrailAPI = function() {
    $.ajax({
      url: 'https://trailapi-trailapi.p.mashape.com/?limit=800&q[state_cont]=Washington',
      method: 'GET',
      headers: {
        'X-Mashape-Key': 'nHipBFct8wmshrLdCiMjoNG1plAEp1WmBAqjsnP2SiB5C9Vcmp',
        'Accept': 'text/plain'
      },
      success: function(data, message, xhr) {
        console.log(data);
        data.places.map(function(current) {
          var place = {
            name: current.name,
            directions: current.directions,
            location: {
              lat: current.lat,
              lon: current.lon
            },
            activities: current.activities.map(function(element) {
              var activityInfo = {
                activity: element.activity_type_name,
                activityLength: element['length'],
                activityDesc: element['description']
              };
              return activityInfo;
            })
          };
          modelHikes.placeholder.push(place);
        });
      }
    }).done(function(){
      console.log(modelHikes.placeholder);
      sqlDB.createTable(sqlDB.insertRecord);
    });
  };

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
        //console.log(data);
      }
    }).done(function(data){
    });
  }

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

  module.modelHikes = modelHikes;
})(window);
