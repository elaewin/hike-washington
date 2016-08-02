(function(module) {

  var homeView = {};

  homeView.loadHome = function() {

  redirect = function() {
    page.redirect('/filters');
  };

  modelHikes.loadAPIData();

  module.homeView = homeView;
})(window);
