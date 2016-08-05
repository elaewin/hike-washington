(function(module) {

  var resultsController = {};

  //update results based on actvitiy, scenery, etc
  resultsController.updateResultsDB = function() {
    filterController.findActiveActivities();
    filterController.activityChoice.forEach(function(current){
      webDB.execute('DELETE FROM resultsDB WHERE activities NOT LIKE "%' + current + '%"',
      function () {
        resultsModel.getHikeResults();
      });
    });
  };

  module.resultsController = resultsController;
})(window);
