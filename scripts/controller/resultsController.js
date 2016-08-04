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

  resultsController.updateResultsDB = function() {
    filtersView.findActiveActivities();
    filtersView.activityChoice.forEach(function(current){
      webDB.execute('DELETE FROM resultsDB WHERE activities NOT LIKE "%' + current + '%"',
      function () {
        resultsView.getHikeResults();
      }
    );
    });
  };

  resultsController.updateScenery = function() {
    sceneryTerms.forEach(function(ele) {
      webDB.execute('UPDATE allHikesDB SET scenery' + ele.key + ' ="' + ele.key + '" WHERE areaDescription LIKE "%' + ele.value + '%" OR hikeDescription LIKE "%' + ele.value + '";');
    });
  };

  module.resultsController = resultsController;

})(window);
