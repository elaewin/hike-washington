(function(module) {
  var homeModel = {};
// Make variable names more self-explainatory!
  homeModel.hikesArray = []; //array used to store Hikes as objects
  homeModel.zipResults = [];

  homeModel.loadAPIData = function() {
    homeModel.checkForData();
  };

  homeModel.checkForData = function() {
    webDB.execute('SELECT * FROM allHikesDB;',
    function(rows) {
      if(rows.length > 0) {
        console.log('drop allHikesDB');
        webDB.execute('DROP TABLE allHikesDB;',
        function() {
          homeModel.callTrailAPI();
        }
        );
      } else {
        homeModel.callTrailAPI();
      }
    });
  };

  homeModel.checkDistanceForData = function() {
    webDB.execute('SELECT * FROM distanceDB;',
    function(rows) {
      if(rows.length > 0) {
        console.log('drop distanceDB');
        webDB.execute('DROP TABLE distanceDB;');
      }
    });
  };

  homeModel.checkResultsForData = function() {
    webDB.execute('SELECT * FROM resultsDB;',
    function(rows) {
      if(rows.length > 0) {
        console.log('drop resultsDB');
        webDB.execute('DROP TABLE resultsDB;');
      }
    });
  };

  homeModel.callTrailAPI = function() {
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
              homeModel.hikesArray.push(place);
            };
          });
        });
      }
    }).done(function() {
      console.log('callTrailAPI is done.');
      homeView.Run();
    });
  };

  homeModel.getLatLng = function(zipCode) {
    if(homeModel.zipResults.length > 1) {
      homeModel.zipResults.length = 0;
    }
    var googleURL = '/theGoogles/' + 'maps/api/geocode/json?address=' + zipCode;
    $.ajax({
      url:  googleURL,
      method: 'POST',
      success: function(data){
        var results = data.results;
        var geoResult = results[0];
        homeModel.zipResults.push(geoResult.geometry.location.lat);
        homeModel.zipResults.push(geoResult.geometry.location.lng);
      }
    }).done(distancesModel.latLonQuery, console.log('latLonQuery done.'), page.redirect('/filters'));
  };

    homeModel.updateScenery = function() {
      sceneryTerms.forEach(function(ele) {
        webDB.execute('UPDATE allHikesDB SET scenery' + ele.key + ' ="' + ele.key + '" WHERE areaDescription LIKE "%' + ele.value + '%" OR hikeDescription LIKE "%' + ele.value + '";');
      });
    };

  module.homeModel = homeModel;
})(window);
