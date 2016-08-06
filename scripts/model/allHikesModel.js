(function(module) {
  var allHikesModel = {};

  allHikesModel.displayHikes = [];

  allHikesModel.createTable = function() {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS allHikesDB (' +
      'id INTEGER PRIMARY KEY, ' +
      'name VARCHAR(255) NOT NULL, ' +
      'activities VARCHAR(255), ' +
      'length FLOAT, ' +
      'lon FLOAT, ' +
      'lat FLOAT, ' +
      'directions VARCHAR (255), ' +
      'scenery TEXT,' +
      'areaDescription TEXT, ' +
      'hikeDescription TEXT, ' +
      'sceneryWildlife VARCHAR(255), ' +
      'sceneryForest VARCHAR(255), ' +
      'sceneryWater VARCHAR(255), ' +
      'sceneryMountain VARCHAR(255));'
    );
  };

  allHikesModel.insertRecord = function() {
    homeModel.hikesArray.forEach( function(element) {
      webDB.execute(
        [
          {
            'sql': 'INSERT INTO allHikesDB (name, activities, length, lon, lat, directions, areaDescription, hikeDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
            'data': [element.name, element.activities.map(function(curr){return curr.activity;}), element.activities.filter(function(curr) {
              return curr.activity === 'hiking';
            }).map(function(curr){return curr.activityLength;}), element['location'].lon, element['location'].lat, element.directions, element.description, element.activities.filter(function(curr) {
              return curr.activity === 'hiking';
            }).map(function(curr){return curr.activityDesc;})]
          }
        ]
      );
    });
  };

  allHikesModel.deleteEverything = function() {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM allHikesDB;'
        }
      ]
    );
  };

  module.allHikesModel = allHikesModel;
})(window);
