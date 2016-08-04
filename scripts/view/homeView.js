(function(module) {

  var homeView = {};

  homeView.renderPage = function() {
    $('.page-content').hide();
    $('#search').fadeIn();
    homeView.zipCode = 0;
    homeView.submitButtonListener();
  };

  homeView.submitButtonListener = function() {
    $('#zipCode-input').on('submit', function(event) {
      event.preventDefault;
      homeController.zipCodeValidator();
    });
  };

  module.homeView = homeView;
})(window);
