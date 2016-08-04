(function(module) {
  var resultsView = {};

  resultsView.resultCount = 0;

  function Hike (opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  };

  resultsView.resultsArray = [];

  resultsView.getHikeResults = function () {
    console.log('resultsView.getHikeResults is running.');
    webDB.execute('SELECT * FROM resultsDB ORDER BY distanceFromUser ASC;',
    function(rows) {
      resultsView.resultsArray = rows.map(function(row) {
        return new Hike(row);
      });
    });
  };

  resultsView.renderResults = function() {
    console.log('resultsView.renderResults is running.');
    var resultsCompiler = Handlebars.compile($('#results-template').text());
    // var sceneArray = row.scenery.split(',');
    var result = resultsCompiler(
      {
        nameOfPlace: name,
        // description: hikeDescription,
        // activitesSelected: activities.split(','),
        // // scenerySelected: sceneArray,
        // lengthOfHike: length,
        // distanceFromUser: distance
      }
    );
    console.log('rendered result is:', result);
    $('#results').append(result);
  };

  resultsView.showThreeResults = function() {
    console.log('resultsView.showThreeResults is running.');
    console.log('resultsView.resultsArray:', resultsView.resultsArray);
    var arrayOfThree = [
      resultsView.resultsArray[0], resultsView.resultsArray[1], resultsView.resultsArray[2]
    ];
    arrayOfThree.forEach(function(hike) {
      resultsView.renderResults(hike);
    });
    // resultsView.resultCount += 3;
  };

  resultsView.Run = function() {
    console.log('resultsView.Run is running.');
    async.series([
      resultsModel.updateResultsDB(),
      resultsView.getHikeResults(),
      resultsView.showThreeResults()
    ]);
  };

  resultsView.render = function() {
    console.log('resultsView.render is running.');
    resultsView.Run();
  };

  module.resultsView = resultsView;
})(window);
