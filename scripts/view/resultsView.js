(function(module) {
  var resultsView = {};

  resultsView.resultCount = 0;

  resultsView.renderResults = function(objToRender) {
    console.log('resultsView.renderResults is running.');
    var resultsCompiler = Handlebars.compile($('#results-template').text());
    this.nameOfPlace = objToRender.name;
    this.description = objToRender.hikeDescription;
    this.activitiesSelected = objToRender.activities.split(',');
    this.scenerySelected = objToRender.scenery.split(',');
    this.lengthOfHike = objToRender.length;
    this.distance = Math.round(objToRender.distanceFromUser);
    var renderedResult = resultsCompiler(this);
    $('#results').append(renderedResult);
  };

  resultsView.showThreeResults = function() {
    $('.page-content').hide();
    $('#results').html('');
    console.log('resultsView.showThreeResults is running.');
    console.log('resultsModel.resultsArray:', resultsModel.resultsArray);
    if(resultsModel.resultsArray.length === 0) {
      resultsView.noResults();
    } else if(resultsModel.resultsArray.length < 3) {
      console.log('less than 3 results!');
      resultsModel.resultsArray.forEach(function(hike) {
        resultsView.renderResults(hike);
      });
    } else {
      resultsModel.resultsArray.forEach(function(hike) {
        resultsView.renderResults(hike);
        // $('#results').
        // $('#results').append('<a id="show-more">show more &rarr;</a>');
        // $('#show-more').on('click', function(){
      });
      // resultsView.resultCount += 3;
    }
    // if(resultsModel.resultsArray > 4){
      // $('#results').append('<a id="show-more">show more &rarr;</a>');
      // $('#show-more').on('click', function(){
      //   resultsModel.resultsArray.shift(2);
      //   resultsView.showThreeResults();
      // });
    $('#results').fadeIn();
  };

  resultsView.noResults = function() {
    $('#results').append('<h4>Sorry! No hikes match the criteria you\'ve selected.</h4><h4>Please try again!</h4><button id="re-try">Back to Filters</button>');
    $('button').on('click', function(){
      page('/filters');
    });
  };

  module.resultsView = resultsView;
})(window);
