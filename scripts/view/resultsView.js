(function(module) {
  var resultsView = {};

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
    })
  };

  resultsView.renderResults = function() {
    var resultsCompiler = Handlebars.compile($('#results-template').text());
    //
  };
        var actArray = row.activities.split(',');
        // var sceneArray = row.scenery.split(',');
        return template(
          {
            name: nameOfPlace,
            hikeDescription: description,
            activitesSelected: actArray,
            // scenerySelected: sceneArray,
            length: lengthOfHike,
            distance: distanceFromUser
          }
        );
      });
    });
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
