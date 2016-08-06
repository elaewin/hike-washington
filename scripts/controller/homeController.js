(function(module) {

  var homeController = {};

  homeController.loadData = function(ctx, next) {
    allHikesModel.createTable(),
    homeModel.loadAPIData();
    homeView.renderPage();
    next();
  };

  homeController.createTables = function() {
    async.series([
      allHikesModel.insertRecord(),
      distancesModel.createTable(),
      resultsModel.createResultsDB(),
      homeModel.checkDistanceForData(),
      homeModel.checkResultsForData(),
      homeModel.updateScenery(),
    ], homeController.callback());
  };

  homeController.callback = function() {
    console.log('callback to keep async working properly.');
  };

  homeController.zipCodeValidator = function() {
    var zipEntered = /\d\d\d\d\d/;
    homeView.zipCode = $('#autocomplete').val();
    if (homeView.zipCode.match(zipEntered)) {
      homeModel.getLatLng(homeView.zipCode);
    } else {
      $('#autocomplete').css({'border-color': 'red'});
      $('#autocomplete').val('');
      $('#autocomplete').attr('placeholder', 'That\'s not a zipcode..');
    }
  };

  module.homeController = homeController;

})(window);
