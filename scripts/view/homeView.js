(function(module) {

  var homeView = {};

  homeView.renderPage = function() {
    $('.page-content').hide();
    $('#search').fadeIn();
    homeView.zipCode = 0;
  };

  $('#zipCode-input').submit(function(event) {
    event.preventDefault();
  });

  $('#search-submit').on('click', function() {
    homeController.zipCodeValidator();
  });

  module.homeView = homeView;
})(window);
