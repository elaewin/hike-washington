(function(module) {
  var sqlDistances = {};
  var latLonQueryArray = [];

  //sqlDB.displayHikes = []; //array used to render hikes to the DOM

  sqlDistances.createTable = function() {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS distanceDB (' +
      'id INTEGER PRIMARY KEY, ' +
      'distance FLOAT, name VARCHAR(255) NOT NULL);'
    );
  };

  sqlDistances.insertRecord = function() {
    sqlDistances.deleteEverything();
    var allLatLon = sqlDistances.latLonQuery();
    latLonQueryArray.forEach(function(element) {
      var lat1 = element.lat;
      console.log(lat1);
      var lon1 = element.lon;
      console.log(lon1);
      var lat2 = modelHikes.zipResults[0];
      var lon2 = modelHikes.zipResults[1];
      var newDistance = distanceCalc.getDistance(lat1, lon1, lat2, lon2);
      var name = element.name;
      webDB.execute(
        [
          {
            'sql': 'INSERT INTO distanceDB (distance, name) VALUES (?, ?);',
            'data': [newDistance, name]
          }
        ]
      );
    });
  };

  sqlDistances.latLonQuery = function() {
    webDB.execute('SELECT lon, lat, name FROM allHikesDB ORDER BY id DESC;',
    function(rows) {
      latLonQueryArray = rows;
      console.log(latLonQueryArray);
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
