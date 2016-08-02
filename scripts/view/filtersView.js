(function(module) {
  var filtersView = {};

  filtersView.clearData = function() {
    $('section').html('');
  };

  filtersView.loadDistanceFilters = function() {
    $('div.filters').append('<div class="distance" data-category="distance"></div>');
    $('div.distance').append('<h2>Distance</h2>');
    var distancesClass = ['green', 'yellow', 'orange', 'red'];
    $('div.distance').append('<ul></ul>');
    distancesClass.forEach(function(color){
      $('div[data-category="distance"] ul').append('<li class="flaticon-hiking ' + color + '"></li>');
    });
  };

  filtersView.loadActivityFilters = function() {
    $('div.filters').append('<div class="activity" data-category="activity"></div>');
    $('div.activity').append('<h2>Activity</h2>');
    var distancesClass = ['flaticon-bicycle-rider', 'flaticon-night-camping', 'flaticon-snowflake'];
    $('div.activity').append('<ul></ul>');
    distancesClass.forEach(function(element){
      $('div[data-category="activity"] ul').append('<li class="' + element + '"></li>');
    });
  };

  filtersView.loadSceneryFilters = function() {
    $('div.filters').append('<div class="scenery" data-category="scenery"></div>');
    $('div.scenery').append('<h2>Scenery</h2>');
    var distancesClass = ['hiking-green.svg', 'hiking-yellow.svg', 'hiking-orange.svg', 'hiking-red.svg'];
    $('div.scenery').append('<ul></ul>');
    distancesClass.forEach(function(element){
      $('div[data-category="scenery"] ul').append('<li><img class="filterIcons" src="vendor/assets/' + element + '"></li>');
    });
  };

    // $('section').append('<form><form>');
    // $('form').append('<fieldset></fieldset>');
    // $('fieldset').append('<input type="checkbox">longer than 5 miles<br>');
    // $('form').append('<button id="button2" type="button">SEE RESULTS</button>');

    // $('#button2').click(function(){filtersView.redirect(); return false;});

  filtersView.Run = function() {
    async.series([
      sqlDB.createTable(),
      sqlDB.deleteEverything(),
      sqlDB.insertRecord(),
      sqlDistances.createTable(),
      sqlDistances.latLonQuery(),
    ]);
  };

  filtersView.redirect = function() {
    page.redirect('/results');
  };

  filtersView.render = function() {
    filtersView.clearData();
    CreateFilters.fetchAll();
    filtersView.loadDistanceFilters();
    filtersView.loadActivityFilters();
    filtersView.loadSceneryFilters();
  };

  module.filtersView = filtersView;
})(window);
