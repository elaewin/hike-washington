(function(module) {

  var homeController = {};

  homeController.index = function() {
    modelHikes.checkDistanceForData();
    modelHikes.checkResultsForData();
    modelHikes.loadAPIData(); //happen on page load
    homeView.Run();  // on page load
  };
  
})(window);
