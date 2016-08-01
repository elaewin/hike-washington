(function(module) {
  var filtersView = {};

  filtersView.clearData = function() {
    $('main').html('');
  };

  filtersView.loadFilters = function() {
    $('main').append('<section>FILTERS</section>');
    $('section').append('<a href="/results">click here for results</a>');
  };

  filtersView.render = function() {
    filtersView.clearData();
    filtersView.loadFilters();
  };

  module.filtersView = filtersView;
})(window);
