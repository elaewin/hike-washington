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
        console.log(row);
        return new Hike(row);
      });
    });
    console.log('results array', resultsView.resultsArray);
  };

  resultsView.renderResults = function(objToRender) {
    console.log('resultsView.renderResults is running.');
    var resultsCompiler = Handlebars.compile($('#results-template').text());
    this.nameOfPlace = objToRender.name;
    this.description = objToRender.hikeDescription;
    this.activitesSelected = objToRender.activities.split(',');
    this.scenerySelected; objToRender.scenery.split(',');
    this.lengthOfHike = objToRender.length;
    this.distance = Math.round(objToRender.distanceFromUser);
    var renderedResult = resultsCompiler(this);
    $('#results').append(renderedResult);
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

  resultsView.callback = function() {
    console.log('results view async series callback reached.');
  };

  resultsView.Run = function() {
    console.log('resultsView.Run is running.');
    async.series([
      resultsModel.updateResultsDB(),
      resultsView.getHikeResults(),
      resultsView.showThreeResults()
    ], resultsView.callback());
  };

  resultsView.render = function() {
    console.log('resultsView.render is running.');
    resultsView.Run();
  };

  module.resultsView = resultsView;
})(window);
