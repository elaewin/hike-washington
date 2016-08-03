(function(module) {
  var resultsView = {};
  resultsView.resultsArray = [];

  var resultsCompiler = Handlebars.compile($('#results-template').text());

  resultsView.Run = function() {
    async.series([
      allHikesModel.createTable(),
      // allHikesModel.deleteEverything(),
      allHikesModel.insertRecord(),
      distancesModel.createTable(),
      resultsModel.updateScenery(),
      distancesModel.latLonQuery()
    ]);
    async.series([
      resultsModel.createResultsDB(),
      resultsModel.joinAllHikesAndDistance(),
      resultsModel.updateResultsDB()
    ]);
  };

  resultsView.render = function() {
    $('main').html('');
    $('main').append('<section>Results</section>');
  };

  module.resultsView = resultsView;
})(window);
