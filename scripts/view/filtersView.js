(function(module) {
  var filtersView = {};
  filtersView.lengthRequest = '';

  filtersView.clearData = function() {
    $('.page-content').hide();
    $('#filters').html('');
    $('#filters-section').fadeIn();
  };

  filtersView.loadDistanceFilters = function() {
    $('#filters').append('<div id="distance" data-category="distance"></div>');
    $('#distance').append('<h2>Distance</h2>');
    var distancesClass = [
      { 'color': 'green', 'miles': '0,3', 'title': 'Short hike; less than 3 miles long.' }, //add alt text here
      { 'color': 'yellow', 'miles': '4,7', 'title': 'Medium length hike; between 3 and 7 miles long.' },
      { 'color': 'orange', 'miles': '8,11', 'title': 'Long hike; between 7 and 11 miles long.' },
      { 'color': 'red', 'miles': '12,800', 'title': 'Very long/overnight hike; more than 11 miles long.' }
    ];
    $('#distance').append('<p>How long you want your hike to be, from short (green), to crazy(red).</p>');
    $('#distance').append('<ul></ul>');
    distancesClass.forEach(function(element){
      $('div[data-category="distance"] ul').append('<li class="flaticon-hiking ' + element.color + '" value="' + element.miles + '" title="' + element.title + '"></li>'); //add alt + distancesClass
    });
  };

  filtersView.loadActivityFilters = function() {
    $('#filters').append('<div id="activity" data-category="activity"></div>');
    $('div#activity').append('<h2>Other Activities</h2>');
    var distancesClass = [['flaticon-bicycle-rider','biking', 'Mountain Biking'], ['flaticon-night-camping', 'camping', 'Camping'], ['flaticon-walking-with-snowshoes', 'snow', 'Snow Shoeing']];
    $('div#activity').append('<p>What would you like to do, besides hiking?</p>');
    $('div#activity').append('<ul></ul>');
    distancesClass.forEach(function(element){
      $('div[data-category="activity"] ul').append('<li class="' + element[0] + ' ltblue other-activity" value="' + element[1] + '" title="' + element[2] + '"></li>');
    });
  };

  filtersView.loadSceneryFilters = function() {
    $('#filters').append('<div id="scenery" data-category="scenery"></div>');
    $('#scenery').append('<h2>Scenery</h2>');
    $('#scenery').append('<p>Is there a particular kind of scenery you\'re looking for?</p>');
    var distancesClass = [['flaticon-wild-deer', 'wildlife', 'Wildlife'], ['flaticon-two-pines', 'forest', 'Forests'], ['flaticon-sun-and-lake', 'water', 'Lake, River, or Ocean'], ['flaticon-snowed-mountains', 'mountains', 'Mountains']];
    $('#scenery').append('<ul></ul>');

    distancesClass.forEach(function(element){
      $('div[data-category="scenery"] ul').append('<li class="' + element[0] + ' dkgreen other-scenery" value="' + element[1] + '" title="' + element[2] + '"></li>');
    });
  };

  filtersView.submitEventListener = function() {
    $('#filters-form').submit(function(event) {
      event.preventDefault();
    });

    $('#filters-submit').on('click', function() {
      page('/results');
    });
  };

  module.filtersView = filtersView;
})(window);
