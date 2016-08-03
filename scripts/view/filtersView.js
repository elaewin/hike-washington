(function(module) {
  var filtersView = {};
  filtersView.lengthRequest = '';

  filtersView.distanceChoice = [];
  filtersView.activityChoice = [];
  filtersView.resultsArray = [];

  filtersView.clearData = function() {
    $('.page-content').hide();
    $('#filters-section').fadeIn();
  };

  filtersView.loadDistanceFilters = function() {
    $('#filters').append('<div id="distance" data-category="distance"></div>');
    $('#distance').append('<h2>Distance</h2>');
    var distancesClass = [
      { 'color': 'green', 'miles': '0,3' },
      { 'color': 'yellow', 'miles': '4,7' },
      { 'color': 'orange', 'miles': '8,11' },
      { 'color': 'red', 'miles': '12,800' }
    ];
    $('#distance').append('<ul></ul>');
    distancesClass.forEach(function(element){
      $('div[data-category="distance"] ul').append('<li class="flaticon-running-man ' + element.color + '" value="' + element.miles + '"></li>');
    });
  };

  filtersView.loadActivityFilters = function() {
    $('#filters').append('<div id="activity" data-category="activity"></div>');
    $('div#activity').append('<h2>Other Activities</h2>');
    var distancesClass = [['flaticon-bicycle-rider','biking'], ['flaticon-night-camping', 'camping'], ['flaticon-snowflake', 'snow']];
    $('div#activity').append('<ul></ul>');
    distancesClass.forEach(function(element){
      $('div[data-category="activity"] ul').append('<li class="' + element[0] + ' black other-activity" value="' + element[1] + '"></li>');
    });
  };

  filtersView.loadSceneryFilters = function() {
    $('#filters').append('<div id="scenery" data-category="scenery"></div>');
    $('#scenery').append('<h2>Scenery</h2>');
    var distancesClass = ['wild-deer', 'two-pines', 'sun-and-lake', 'snowed-mountains'];
    $('#scenery').append('<ul></ul>');
    distancesClass.forEach(function(icon){
      $('div[data-category="scenery"] ul').append('<li class="flaticon-' + icon + ' black"></li>');
    });
  };

  filtersView.handleDistanceSelections = function() {
    $('#distance li').on('click', function(event) {
      console.log('click');
      var $selection = $(event.target);
      if($selection.hasClass('active')) {
        $selection.removeClass('active');
      } else {
        $selection.addClass('active').siblings($selection).removeClass('active');
        distanceValues = $selection.attr('value');
        filtersView.distanceChoice = [parseInt(distanceValues.split(',')[0]), parseInt(distanceValues.split(',')[1])];
        console.log(filtersView.distanceChoice);
      }
    });
  };

  filtersView.handleActivitySelections = function() {
    $('#activity li').on('click', function(event){
      var $selection = $(event.target);
      if($selection.hasClass('active')){
        $selection.removeClass('active');
      } else {
        $selection.addClass('active');
      }
    });
  };

  filtersView.handleScenerySelections = function() {
    $('#scenery li').on('click', function(event){
      var $selection = $(event.target);
      if($selection.hasClass('active')){
        $selection.removeClass('active');
      } else {
        $selection.addClass('active');
      }
    });
  };

  filtersView.createResultsDB = function() {
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

  filtersView.selectFromAllHikesDB = function() {
    webDB.execute('SELECT * FROM allHikesDB ' +
    'INNER JOIN distanceDB ON allHikesDB.name=distanceDB.name ' +
    'WHERE allHikesDB.length BETWEEN ' +
    filtersView.distanceChoice[0] + ' AND ' + filtersView.distanceChoice[1] + ';',
    function(rows) {
      filtersView.resultsArray = rows;
      filtersView.populateResultsDB();
    });
  };

  //populate results based on distance
  filtersView.populateResultsDB = function() {
    filtersView.resultsArray.forEach(function(resultsObj) {
      webDB.execute(
        [
          {
            'sql': 'INSERT INTO resultsDB (name, activities, length, lon, lat, directions, distanceFromUser, scenery, hikeDescription, areaDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
            'data': [resultsObj.name, resultsObj.activities, resultsObj.length, resultsObj.lon, resultsObj.lat, resultsObj.directions, resultsObj.distance, 'scenery goes here!', resultsObj.hikeDescription, resultsObj.areaDescription]
          }
        ],
        function() {
          page.redirect('/results');
        }
      );
    });
  };

  //update results based on actvitiy, scenery, etc
  filtersView.updateResultsDB = function() {
    filtersView.findActiveActivities();
    filtersView.activityChoice.forEach(function(current){
      webDB.execute('DELETE FROM resultsDB WHERE activities NOT LIKE "%' + current + '%"');
    });
  };

  //find activites that have been clicked
  filtersView.findActiveActivities = function() {
    $('.other-activity.active').each(function(){
      console.log($(this));
      filtersView.activityChoice.push($(this).attr('value'));
    });
  };

  filtersView.Run = function() {
    async.series([
      sqlDB.createTable(),
      // sqlDB.deleteEverything(),
      sqlDB.insertRecord(),
      sqlDistances.createTable(),
      sqlDB.updateScenery(),
      sqlDistances.latLonQuery()
    ]);
  };

  filtersView.render = function() {
    filtersView.clearData();
    // CreateFilters.fetchAll();
    filtersView.loadDistanceFilters();
    filtersView.loadActivityFilters();
    filtersView.loadSceneryFilters();
    filtersView.handleDistanceSelections();
    filtersView.handleActivitySelections();
    filtersView.handleScenerySelections();
  };

  $('#filters-form').submit(function(event) {
    event.preventDefault();
    async.series([
      filtersView.createResultsDB(),
      filtersView.selectFromAllHikesDB()
    ]);
  });

  module.filtersView = filtersView;
})(window);
