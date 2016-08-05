(function(module) {

  var resultsController = {};

  resultsController.updateResultsDB = function() {
    filterController.findActiveActivities();
    filterController.activityChoice.forEach(function(current){
      webDB.execute('DELETE FROM resultsDB WHERE activities NOT LIKE "%' + current + '%"');
    });
    filterController.findActiveScenery();
    console.log('scenery array:', filterController.sceneryChoice);
    filterController.sceneryChoice.forEach(function(current){
      webDB.execute('DELETE FROM resultsDB WHERE scenery NOT LIKE "%' + current + '%"',
           function () {
             resultsModel.getHikeResults();
           });
    });
  };

  module.resultsController = resultsController;
})(window);
