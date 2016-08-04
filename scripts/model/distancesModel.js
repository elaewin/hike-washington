(function(module) {
  var distancesModel = {};
  var latLonQueryArray = [];

  //sqlDB.displayHikes = []; //array used to render hikes to the DOM

  distancesModel.createTable = function() {
    console.log('creating distances DB');
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS distanceDB (' +
      'id INTEGER PRIMARY KEY, ' +
      'distance FLOAT, name VARCHAR(255) NOT NULL);'
    );
  };

  distancesModel.populateDistancesDB = function() {
    console.log('Populate distances db is happening');
    distancesModel.deleteEverything();
    latLonQueryArray.forEach(function(element) {
      var lat1 = element['lat'];
      var lon1 = element['lon'];
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

  distancesModel.latLonQuery = function() {
    webDB.execute('SELECT lon, lat, name FROM allHikesDB ORDER BY id DESC;',
    function(rows) {
      latLonQueryArray = rows;
      console.log('Query Finished');
      distancesModel.populateDistancesDB();
    });
  };

  distancesModel.deleteEverything = function(){
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM distanceDB;'
        }
      ]
    );
  };

  module.distancesModel = distancesModel;
})(window);
