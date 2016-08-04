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
      allHikesModel.createTable(),
      allHikesModel.insertRecord(),
      distancesModel.createTable(),
      resultsModel.createResultsDB()
    ], homeView.callback());
  };

  homeController.render = function() {
    $('.page-content').hide();
    $('#search').fadeIn();
    homeView.zipCode = 0;
    $('#zipCode-input').submit(function(event) {
      event.preventDefault();
    });
  };

  module.homeController = homeController;

})(window);
