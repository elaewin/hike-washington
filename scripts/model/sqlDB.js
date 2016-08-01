(function(module) {
  var sqlDB = {};

  sqlDB.displayHikes = []; //array used to render hikes to the DOM

  sqlDB.createTable = function(callback) {
    sqlDB.deleteEverything();
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS allHikesDB (' +
      'id INTEGER PRIMARY KEY, ' +
      'name VARCHAR(255) NOT NULL, ' +
      'activities VARCHAR(255), ' +
      'length FLOAT, ' +
      'lon FLOAT, ' +
      'lat FLOAT, ' +
      'directions VARCHAR (255));'
    );
    callback();
  };

  sqlDB.insertRecord = function() {

    modelHikes.hikesArray.forEach( function(element) {
      webDB.execute(
        [
          {
            'sql': 'INSERT INTO allHikesDB (name, activities, length, lon, lat, directions) VALUES (?, ?, ?, ?, ?, ?);',
            'data': [element.name, element.activities.map(function(curr){return curr.activity;}), element.activities.map(function(curr){return curr.activityLength;}), element['location'].lon, element['location'].lat, element.directions]
          }
        ]
      );
    });
  };

//populates the array that we want to render to the browser (doug)
  sqlDB.toHTML = function(num, callback) {
    webDB.execute('SELECT * FROM allHikesDB WHERE length >' + num, function(rows) {
      sqlDB.displayHikes.push(rows);
    });
    callback();
  };

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
