(function(module) {
  var filtersView = {};
  filtersView.lengthRequest = '';
  filtersView.distanceChoice = [];
  filtersView.activityChoice = [];

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
      $('div[data-category="distance"] ul').append('<li class="flaticon-running-man ' + element.color + '" value="' + element.miles + '"></li>'); //add alt + distancesClass
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

  //find activites that have been clicked
  filtersView.findActiveActivities = function() {
    $('.other-activity.active').each(function(){
      console.log($(this));
      filtersView.activityChoice.push($(this).attr('value'));
    });
  };

  filtersView.render = function() {
    filtersView.clearData();
    filtersView.loadDistanceFilters();
    filtersView.loadActivityFilters();
    filtersView.loadSceneryFilters();
    filtersView.handleDistanceSelections();
    filtersView.handleActivitySelections();
    filtersView.handleScenerySelections();
  };

  $('#filters-form').submit(function(event) {
    event.preventDefault();
    resultsView.Run();
    page.redirect('/results');
    
  });

  module.filtersView = filtersView;
})(window);
