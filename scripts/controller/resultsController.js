(function(module) {

  var resultsController = {};

  resultsController.render = function() {
    console.log('resultsController.Run is running.');
    resultsController.updateResultsDB();
  };

  module.resultsController = resultsController;

})(window);
