(function(module) {
  var filtersView = {};

  filtersView.clearData = function() {
    $('section').html('');
  };

  filtersView.loadFilters = function() {
    $('main').append('<section>FILTERS</section>');
    $('section').append('<form><form>');
    $('form').append('<fieldset></fieldset>');
    $('fieldset').append('<input type="checkbox">longer than 5 miles<br>');
    $('form').append('<button id="button2" type="button">SEE RESULTS</button>');

    $('#button2').click(function(){filtersView.redirect(); return false;});

  };

  filtersView.redirect = function() {
    page.redirect('/results');
  };

  filtersView.render = function() {
    filtersView.clearData();
    CreateFilters.fetchAll();
  };

  module.filtersView = filtersView;
})(window);
