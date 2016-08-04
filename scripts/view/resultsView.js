(function(module) {
  var resultsView = {};

  resultsView.resultCount = 0;

  resultsView.renderResults = function(objToRender) {
    console.log('resultsView.renderResults is running.');
    var resultsCompiler = Handlebars.compile($('#results-template').text());
    this.nameOfPlace = objToRender.name;
    this.description = objToRender.hikeDescription;
    this.activitiesSelected = objToRender.activities.split(',');
    this.scenerySelected; objToRender.scenery.split(',');
    console.log('activities:', this.activitesSelected);
    this.lengthOfHike = objToRender.length;
    this.distance = Math.round(objToRender.distanceFromUser);
    var renderedResult = resultsCompiler(this);
    console.log(renderedResult);
    $('#results').append(renderedResult);
    // resultsView.showThreeResults();
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

  // resultsView.callback = function() {
  //   console.log('results view async series callback reached.');
  // };
  //
  // resultsView.Run = function() {
  //   console.log('resultsView.Run is running.');
  //   resultsModel.updateResultsDB(); // move getHikes as "callback"
  // };
  //
  // resultsView.render = function() {
  //   console.log('resultsView.render is running.');
  //   resultsView.Run();
  // };

  module.resultsView = resultsView;
})(window);
