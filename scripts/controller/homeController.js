(function(module) {

  var homeController = {};

  homeController.loadData = function() {
    modelHikes.checkDistanceForData();
    modelHikes.checkResultsForData();
    modelHikes.loadAPIData(); //happen on page load
  };

  homeController.index = function() {
    async.series([
      allHikesModel.createTable(),
      allHikesModel.insertRecord(),
      distancesModel.createTable(),
      resultsModel.createResultsDB()
    ], homeView.callback());
  };

})(window);
