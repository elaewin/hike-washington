(function(module) {
  var sqlDB = {};

  sqlDB.displayHikes = []; //array used to render hikes to the DOM

  sqlDB.createTable = function() {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS allHikesDB (' +
      'id INTEGER PRIMARY KEY, ' +
      'name VARCHAR(255) NOT NULL, ' +
      'activities VARCHAR(255), ' +
      'length FLOAT, ' +
      'lon FLOAT, ' +
      'lat FLOAT, ' +
      'directions TEXT, ' +
      'scenery TEXT,' +
      'areaDescription TEXT, ' +
      'hikeDescription TEXT, ' +
      'sceneryWildlife VARCHAR(255), ' +
      'sceneryForrest VARCHAR(255), ' +
      'sceneryWater VARCHAR(255), ' +
      'sceneryMountain VARCHAR(255));'
    );
    // sqlDB.deleteEverything();
  };

  sqlDB.insertRecord = function() {

    modelHikes.hikesArray.forEach( function(element) {
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

  sqlDB.updateScenery = function() {
    sceneryTerms.forEach(function(ele) {
      webDB.execute('UPDATE allHikesDB SET scenery' + ele.key + ' ="' + ele.key + '" WHERE areaDescription LIKE "%' + ele.value + '%" OR hikeDescription LIKE "%' + ele.value + '";');
    });
  };

  // sqlDB.concatScenery = function () {
  //   webDB.execute('UPDATE allHikesDB SET scenery = CONCAT(sceneryWildlife, " ", sceneryForrest, " ", sceneryWater, " ", sceneryMountain);');
  // };

//populates the array that we want to render to the browser (doug)
  // sqlDB.toHTML = function(num, callback) {
  //   webDB.execute('SELECT * FROM allHikesDB WHERE length >' + num, function(rows) {
  //     sqlDB.displayHikes.push(rows);
  //   });
  //   callback();
  // };

  sqlDB.deleteEverything = function(){
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM allHikesDB;'
        }
      ]
    );
  };

  module.sqlDB = sqlDB;
})(window);
