(function(module) {
  var resultsView = {};

  var resultCount = 0;

  function Hike (opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  };

  resultsView.resultsArray = [];

  resultsView.loadHikeResults = function () {
    webDB.execute('SELECT * FROM resultsDB SORT BY distanceFromUser ASC',
    function(rows) {
      resultsView.resultsArray = rows.map(function(row) {
        return new Hike(row);
      });
    });
  };

  resultsView.renderResults = function(element) {
    var resultsCompiler = Handlebars.compile($('#results-template').text());
    var actArray = row.activities.split(',');
    // var sceneArray = row.scenery.split(',');
    var result = resultsCompiler(
      {
        name: nameOfPlace,
        hikeDescription: description,
        activitesSelected: actArray,
        // scenerySelected: sceneArray,
        length: lengthOfHike,
        distance: distanceFromUser
      }
    );
    $('#results').append(result);
  };

  resultsView.showThreeResults = function() {
    var arrayOfThree = [
      resultsView.resultsArray[resultCount], resultsView.resultsArray[resultCount + 1], resultsView.resultsArray[resultCount + 2]
    ];
    arrayOfThree.forEach(function(hike) {
      resultsView.renderResults(hike);
    });
    resultCount += 3;
  };

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
