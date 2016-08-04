(function(module) {

  var homeController = {};

  homeController.loadData = function() {
    console.log('homeController.loadData running.');
    homeModel.checkDistanceForData();
    homeModel.checkResultsForData();
    homeModel.loadAPIData(); //happen on page load
  };

  homeController.index = function() {
    console.log('homeController.index async nonsense running.');
    async.series([
      homeView.renderPage(),
      allHikesModel.createTable(),
      allHikesModel.insertRecord(),
      distancesModel.createTable(),
      resultsModel.createResultsDB(),
      homeModel.updateScenery()
    ], homeView.callback());
  };

  homeController.callback = function() {
    console.log('callback to keep async working properly.');
  };

  homeController.zipCodeValidator = function() {
    var zipEntered = /\d\d\d\d\d/;
    homeView.zipCode = $('#autocomplete').val();
    if (homeView.zipCode.match(zipEntered)) {
      homeModel.getLatLng(homeView.zipCode);
      console.log('Redirect working');
    } else {
      $('#autocomplete').css({'border-color': 'red'});
      $('#autocomplete').val('');
      $('#autocomplete').attr('placeholder', 'That\'s not a zipcode..');
      console.log('Not a valid zip code');
    }
  };

  module.homeController = homeController;

})(window);
