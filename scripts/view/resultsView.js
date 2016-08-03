(function(module) {
  var resultsView = {};

  var resultsCompiler = Handlebars.compile($('#results-template').text());

  resultsView.Run = function() {
    async.series([
      resultsModel.createResultsDB(resultsModel.joinAllHikesAndDistance),
      // resultsModel.joinAllHikesAndDistance(),
      // resultsModel.updateResultsDB()
    ]);
  };

  resultsView.render = function() {
    resultsView.Run();
    $('main').html('');
    $('main').append('<section>Results</section>');
  };

  module.resultsView = resultsView;
})(window);
