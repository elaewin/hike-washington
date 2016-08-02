(function(module) {
  var filtersView = {};

  filtersView.clearData = function() {
    $('.page-content').hide();
    $('#filters').fadeIn();
  };

  filtersView.loadDistanceFilters = function() {
    $('#filters').append('<div id="distance" data-category="distance"></div>');
    $('#distance').append('<h2>Distance</h2>');
    var distancesClass = ['green', 'yellow', 'orange', 'red'];
    $('#distance').append('<ul></ul>');
    distancesClass.forEach(function(color){
      $('div[data-category="distance"] ul').append('<li class="flaticon-running-man ' + color + '"></li>');
    });
  };

  filtersView.loadActivityFilters = function() {
    $('#filters').append('<div class="activity" data-category="activity"></div>');
    $('div.activity').append('<h2>Other Activities</h2>');
    var distancesClass = ['flaticon-bicycle-rider', 'flaticon-night-camping', 'flaticon-snowflake'];
    $('div.activity').append('<ul></ul>');
    distancesClass.forEach(function(element){
      $('div[data-category="activity"] ul').append('<li class="' + element + '"></li>');
    });
  };

  filtersView.loadSceneryFilters = function() {
    $('#filters').append('<div id="scenery" data-category="scenery"></div>');
    $('#scenery').append('<h2>Scenery</h2>');
    var distancesClass = ['green', 'yellow', 'orange', 'red'];
    $('#scenery').append('<ul></ul>');
    distancesClass.forEach(function(color){
      $('div[data-category="scenery"] ul').append('<li class="flaticon-two-pines"></li>');
    });
  };

    // $('section').append('<form><form>');
    // $('form').append('<fieldset></fieldset>');
    // $('fieldset').append('<input type="checkbox">longer than 5 miles<br>');
    // $('form').append('<button id="button2" type="button">SEE RESULTS</button>');

    // $('#button2').click(function(){filtersView.redirect(); return false;});

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
