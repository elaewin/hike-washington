(function(module) {
  var sqlDistances = {};

  //sqlDB.displayHikes = []; //array used to render hikes to the DOM

  sqlDistances.createTable = function(callback, zipCode) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS distanceDB (' +
      'id INTEGER PRIMARY KEY, ' +
      'distance FLOAT);'
    );
    callback(zipCode);
  };

  sqlDistances.insertRecord = function(zipCode) {
    // sqlDistances.deleteEverything();
    var zipLocation = modelHikes.getLatLng(zipCode);
    console.log(zipLocation);
    modelHikes.hikesArray.forEach(function(element) {
      var lat1 = element['location'].lat;
      var lon1 = element['location'].lon;
      var lat2 = zipLocation[0];
      var lon2 = zipLocation[1];
      var newDistance = distanceCalc.getDistance(lat1, lon1, lat2, lon2);
      webDB.execute(
        [
          {
            'sql': 'INSERT INTO distanceDB (distance) VALUES (?);',
            'data': [newDistance]
          }
        ]
      );
    });
  };

  sqlDistances.deleteEverything = function(){
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM distanceDB;'
        }
      ]
    );
  };

  module.sqlDistances = sqlDistances;
})(window);
