(function(module) {
  var resultsModel = {};

  resultsModel.resultsArray = [];
  resultsModel.joinedArray = [];

  function Hike (opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  };

  resultsModel.getHikeResults = function () {
    console.log('resultsView.getHikeResults is running.');
    webDB.execute('SELECT * FROM resultsDB ORDER BY distanceFromUser ASC;',
    function(rows) {
      resultsModel.resultsArray = rows.map(function(row) {
        console.log(row);
        return new Hike(row);
      });
      console.log('results array', resultsModel.resultsArray);
      resultsView.showThreeResults(); // here to deal with async issues
    });
  };

// create a table to store filter results
  resultsModel.createResultsDB = function() {
    console.log('create ResultsDB running');
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

// the creates an array to be populated on results table
  resultsModel.joinAllHikesAndDistance = function() {
    console.log('joinAllHikesAndDistance running');
    webDB.execute('SELECT * FROM allHikesDB INNER JOIN distanceDB ON allHikesDB.name=distanceDB.name WHERE allHikesDB.length BETWEEN ' +
    filterController.distanceChoice[0] + ' AND ' + filterController.distanceChoice[1] + ';',
    function(rows) {
      resultsModel.joinedArray = rows;
      console.log('resultsDB about to be populated');
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
            'data': [resultsObj.name, resultsObj.activities, resultsObj.length, resultsObj.lon, resultsObj.lat, resultsObj.directions, resultsObj.distance, [resultsObj.sceneryWildlife, resultsObj.sceneryWater, resultsObj.sceneryMountain, resultsObj.sceneryForrest], resultsObj.hikeDescription, resultsObj.areaDescription]
          }
        ]
      );
    });
  };

  module.resultsModel = resultsModel;
})(window);
