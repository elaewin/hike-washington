(function(module) {
  var resultsModel = {};

  function Hike (opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  };

  resultsModel.getHikeResults = function () {
    resultsModel.resultsArray = [];
    webDB.execute('SELECT * FROM resultsDB ORDER BY distanceFromUser ASC;',
    function(rows) {
      resultsModel.resultsArray = rows.map(function(row) {
        return new Hike(row);
      });
      resultsView.showThreeResults();
    });
  };

  resultsModel.createResultsDB = function() {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS resultsDB (' +
      'id INTEGER PRIMARY KEY, ' +
      'name VARCHAR(255) NOT NULL, ' +
      'activities VARCHAR(255), ' +
      'length FLOAT, ' +
      'lon FLOAT, ' +
      'lat FLOAT, ' +
      'directions VARCHAR (255),' +
      'distanceFromUser FLOAT,' +
      'scenery VARCHAR,' +
      'hikeDescription TEXT,' +
      'areaDescription TEXT);'
    );
  };

  resultsModel.joinAllHikesAndDistance = function() {
    resultsModel.joinedArray = [];
    webDB.execute('SELECT * FROM allHikesDB INNER JOIN distanceDB ON allHikesDB.name=distanceDB.name WHERE allHikesDB.length BETWEEN ' +
    filterController.distanceChoice[0] + ' AND ' + filterController.distanceChoice[1] + ';',
    function(rows) {
      resultsModel.joinedArray = rows;
      resultsModel.populateResultsDB();
    });
  };

  resultsModel.populateResultsDB = function() {
    webDB.execute('DELETE FROM resultsDB;');
    resultsModel.joinedArray.forEach(function(resultsObj) {
      webDB.execute(
        [
          {
            'sql': 'INSERT INTO resultsDB (name, activities, length, lon, lat, directions, distanceFromUser, scenery, hikeDescription, areaDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
            'data': [resultsObj.name, resultsObj.activities, resultsObj.length, resultsObj.lon, resultsObj.lat, resultsObj.directions, resultsObj.distance, [resultsObj.sceneryWildlife, resultsObj.sceneryWater, resultsObj.sceneryMountain, resultsObj.sceneryForest], resultsObj.hikeDescription, resultsObj.areaDescription]
          }
        ]
      );
    });
  };

  module.resultsModel = resultsModel;
})(window);
