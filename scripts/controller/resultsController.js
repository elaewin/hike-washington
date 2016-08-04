(function(module) {

  var resultsController = {};

  resultsController.Run = function() {
    console.log('resultsController.Run is running.');
    resultsController.updateResultsDB();
  };

  resultsController.render = function() {
    console.log('resultsController.render is running.');
    resultsController.Run();
  };

  module.resultsController = resultsController;

})(window);
