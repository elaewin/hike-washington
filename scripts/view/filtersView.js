(function(module) {
  var filtersView = {};

  filtersView.clearData = function() {
    $('section').html('');
  };

  filtersView.loadFilters = function() {
    var distancesClass = ['hiking-green.svg', 'hiking-yellow.svg', 'hiking-orange.svg', 'hiking-red.svg'];
    distancesClass.forEach(function(element){
      $('div[data-category="distance"] ul').append('<li><img class="' + element + '" src="vendor/assets/' + element + '"></li>');
    });
    // $('section').append('<form><form>');
    // $('form').append('<fieldset></fieldset>');
    // $('fieldset').append('<input type="checkbox">longer than 5 miles<br>');
    // $('form').append('<button id="button2" type="button">SEE RESULTS</button>');

    // $('#button2').click(function(){filtersView.redirect(); return false;});

  };

  filtersView.redirect = function() {
    page.redirect('/results');
  };

  filtersView.render = function() {
    filtersView.clearData();
    CreateFilters.fetchAll();
    filtersView.loadFilters();
  };

  module.filtersView = filtersView;
})(window);
