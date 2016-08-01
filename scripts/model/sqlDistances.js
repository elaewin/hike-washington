(function(module) {
  var sqlDistances = {};

  //sqlDB.displayHikes = []; //array used to render hikes to the DOM

  sqlDistances.createTable = function(callback) {
    sqlDistances.deleteEverything();
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS distanceDB (' +
      'id INTEGER PRIMARY KEY, ' +
      'distance FLOAT);'
    );
    callback();
  };

  sqlDistances.insertRecord = function() {

    modelHikes.hikesArray.forEach( function(element) {
      var newDistance
      webDB.execute(
        [
          {
            'sql': 'INSERT INTO distanceDB (distance) VALUES (?);',
            'data': [element.distance] // FIX THIS
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

  module.sqlDB = sqlDB;
})(window);
