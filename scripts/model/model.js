(function(module) {
  var modelHikes = {};
// Make variable names more self-explainatory!
  modelHikes.hikesArray = []; //array used to store Hikes as objects
  modelHikes.zipResults = [];

  modelHikes.loadAPIData = function() {
    modelHikes.checkForData();
    // if(!localStorage.visited) {
    //   console.log('callTrailAPI called');
      // modelHikes.callTrailAPI();
      // localStorage.setItem('visited', true);
    // }
    // else {
    //   modelHikes.checkForData();
    //   localStorage.setItem('visited', true);
    // }
  };

  modelHikes.checkForData = function() {
    webDB.execute('SELECT * FROM allHikesDB;',
    function(rows) {
      if(rows.length > 0) {
        console.log('drop allHikesDB');
        webDB.execute('DROP TABLE allHikesDB;',
        function() {
          modelHikes.callTrailAPI();
        }
        );
      } else {
        modelHikes.callTrailAPI();
      }
    });
  };

  modelHikes.checkDistanceForData = function() {
    webDB.execute('SELECT * FROM distanceDB;',
    function(rows) {
      if(rows.length > 0) {
        console.log('drop distanceDB');
        webDB.execute('DROP TABLE distanceDB;');
      }
    });
  };

  modelHikes.checkResultsForData = function() {
    webDB.execute('SELECT * FROM resultsDB;',
    function(rows) {
      if(rows.length > 0) {
        console.log('drop resultsDB');
        webDB.execute('DROP TABLE resultsDB;');
      }
    });
  };

  modelHikes.callTrailAPI = function() {
    console.log('trail api running');
    $.getJSON({
      url: '../data/hikes.json',
      success: function(data, message, xhr) {
        console.log('callTrailAPI returning:', data);
        data.places.map(function(current) {
          var place = {
            name: current.name,
            directions: current.directions,
            location: {
              lat: current.lat,
              lon: current.lon
            },
            description: current.description,
            activities: current.activities.map(function(element) {
              var activityInfo = {
                activity: element.activity_type_name,
                activityLength: element['length'],
                activityDesc: element['description']
              };
              return activityInfo;
            })
          };
          place.activities.forEach(function(element) {
            if(element['activity'] === 'hiking') {
              modelHikes.hikesArray.push(place);
            };
          });
        });
      }
    }).done(function() {
      console.log('callTrailAPI is done.');
      homeView.Run();
    });
  };

  modelHikes.getLatLng = function(zipCode) {
    if(modelHikes.zipResults.length > 1) {
      modelHikes.zipResults.length = 0;
    }
    var authKey = googleAPIKey;
    $.ajax({
      url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + zipCode + '?key=' + authKey,
      method: 'POST',
      success: function(data){
        var results = data.results;
        var geoResult = results[0];
        modelHikes.zipResults.push(geoResult.geometry.location.lat);
        modelHikes.zipResults.push(geoResult.geometry.location.lng);
      }
    }).done(distancesModel.latLonQuery, console.log('latLonQuery done.'), page.redirect('/filters'));
  };

  module.modelHikes = modelHikes;
})(window);
