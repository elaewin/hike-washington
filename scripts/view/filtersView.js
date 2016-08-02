(function(module) {
  var filtersView = {};
  filtersView.lengthRequest = '';

  var distanceChoice = [];

  filtersView.clearData = function() {
    $('.page-content').hide();
    $('#filters-section').fadeIn();
  };

  filtersView.loadDistanceFilters = function() {
    $('#filters').append('<div id="distance" data-category="distance"></div>');
    $('#distance').append('<h2>Distance</h2>');
    var distancesClass = [
      { color: 'green', 'miles': '0,3' },
      { color: 'yellow', 'miles': '4,7' },
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
    var distancesClass = ['flaticon-bicycle-rider', 'flaticon-night-camping', 'flaticon-snowflake'];
    $('div#activity').append('<ul></ul>');
    distancesClass.forEach(function(element){
      $('div[data-category="activity"] ul').append('<li class="' + element + ' black"></li>');
    });
  };

  filtersView.loadSceneryFilters = function() {
    $('#filters').append('<div id="scenery" data-category="scenery"></div>');
    $('#scenery').append('<h2>Scenery</h2>');
    var distancesClass = ['black', 'black', 'black', 'black'];
    $('#scenery').append('<ul></ul>');
    distancesClass.forEach(function(color){
      $('div[data-category="scenery"] ul').append('<li class="flaticon-two-pines black"></li>');
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
        distanceChoice = [parseInt(distanceValues.split(',')[0]), parseInt(distanceValues.split(',')[1])];
        console.log(distanceChoice);
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

  filtersView.Run = function() {
    async.series([
      sqlDB.createTable(),
      // sqlDB.deleteEverything(),
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
    // CreateFilters.fetchAll();
    filtersView.loadDistanceFilters();
    filtersView.loadActivityFilters();
    filtersView.loadSceneryFilters();
    filtersView.handleDistanceSelections();
    filtersView.handleActivitySelections();
    filtersView.handleScenerySelections();
  };

  module.filtersView = filtersView;
})(window);
