(function(module) {

  var resultsController = {};

  resultsController.updateResultsDB = function() {
    var activityCounter = 0;
    var sceneryCounter = 0;
    filterController.findActiveActivities();
    filterController.activityChoice.forEach(function(current){
      webDB.execute('DELETE FROM resultsDB WHERE activities NOT LIKE "%' + current + '%"',
      function () {
        activityCounter++;
        if(activityCounter === filterController.activityChoice.length) {
          console.log('activities all removed');
          filterController.findActiveScenery();
          filterController.sceneryChoice.forEach(function(current){
            webDB.execute('DELETE FROM resultsDB WHERE scenery NOT LIKE "%' + current + '%"',
            function () {
              sceneryCounter++;
              if(sceneryCounter === filterController.sceneryChoice.length) {
                console.log('scenery all removed');
                resultsModel.getHikeResults();
              }
            });
          });
        }
      });
    });
  };

  module.resultsController = resultsController;
})(window);
