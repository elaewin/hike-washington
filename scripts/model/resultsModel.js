(function(module) {
  var resultsModel = {};
  resultsModel.resultsArray = [];

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
    filtersView.distanceChoice[0] + ' AND ' + filtersView.distanceChoice[1] + ';',
    function(rows) {
      resultsModel.resultsArray = rows;
      console.log('resultsDB about to be populated');
      resultsModel.populateResultsDB();
    });
  };

  resultsModel.populateResultsDB = function() {
    webDB.execute('DELETE FROM resultsDB;');
    resultsModel.resultsArray.forEach(function(resultsObj) {
      webDB.execute(
        [
          {
            'sql': 'INSERT INTO resultsDB (name, activities, length, lon, lat, directions, distanceFromUser, scenery, hikeDescription, areaDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
            'data': [resultsObj.name, resultsObj.activities, resultsObj.length, resultsObj.lon, resultsObj.lat, resultsObj.directions, resultsObj.distance, 'scenery goes here!', resultsObj.hikeDescription, resultsObj.areaDescription]
          }
        ]
      );
    });
  };

  //update results based on actvitiy, scenery, etc
  // resultsModel.updateResultsDB = function() {
  //   filtersView.findActiveActivities();
  //   filtersView.activityChoice.forEach(function(current){
  //     webDB.execute('DELETE FROM resultsDB WHERE activities NOT LIKE "%' + current + '%"',
  //     function () {
  //       resultsView.getHikeResults();
  //     }
  //   );
  //   });
  // };
  //
  // resultsModel.updateScenery = function() {
  //   sceneryTerms.forEach(function(ele) {
  //     webDB.execute('UPDATE allHikesDB SET scenery' + ele.key + ' ="' + ele.key + '" WHERE areaDescription LIKE "%' + ele.value + '%" OR hikeDescription LIKE "%' + ele.value + '";');
  //   });
  // };

  module.resultsModel = resultsModel;
})(window);
