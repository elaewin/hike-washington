(function(module) {
  var filtersView = {};
  filtersView.lengthRequest = '';

  filtersView.clearData = function() {
    $('.page-content').hide();
    $('#filters-section').fadeIn();
  };

  filtersView.loadDistanceFilters = function() {
    $('#filters').append('<div id="distance" data-category="distance"></div>');
    $('#distance').append('<h2>Distance</h2>');
    var distancesClass = [
      { 'color': 'green', 'miles': '0,3' }, //add alt text here
      { 'color': 'yellow', 'miles': '4,7' },
      { 'color': 'orange', 'miles': '8,11' },
      { 'color': 'red', 'miles': '12,800' }
    ];
    $('#distance').append('<ul></ul>');
    distancesClass.forEach(function(element){
      $('div[data-category="distance"] ul').append('<li class="flaticon-hiking ' + element.color + '" value="' + element.miles + '"></li>'); //add alt + distancesClass
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

  filtersView.submitEventListener = function() {
    $('#filters-form').submit(function(event) {
      event.preventDefault();
    });

    $('#filters-submit').on('click', function() {
      page.redirect('/results');
    });
  };

  module.filtersView = filtersView;
})(window);
