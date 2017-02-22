(function(module) {
  var resultsView = {};

  resultsView.resultCount = 0;

  resultsView.renderResults = function(objToRender) {
    var resultsCompiler = Handlebars.compile($('#results-template').text());
    this.nameOfPlace = objToRender.name;
    this.description = objToRender.hikeDescription;
    this.activitiesSelected = objToRender.activities.split(',');
    this.scenerySelected = objToRender.scenery.split(',').filter(function(ele){return ele != '';});;
    this.lengthOfHike = objToRender.length;
    this.distance = Math.round(objToRender.distanceFromUser);
    var renderedResult = resultsCompiler(this);
    $('#results').append(renderedResult);
  };

  resultsView.showThreeResults = function() {
    $('.page-content').hide();
    $('#results').html('');
    $('#results').append('<h4>Here are the hikes that match your criteria, with the closest hikes to you first:</h4>');
    if(resultsModel.resultsArray.length === 0) {
      resultsView.noResults();
    } else if(resultsModel.resultsArray.length < 3) {
      resultsModel.resultsArray.forEach(function(hike) {
        resultsView.renderResults(hike);
      });
    } else {
      resultsModel.resultsArray.forEach(function(hike) {
        resultsView.renderResults(hike);
      });
    };
    $('.header-h1').css('visibility', 'visible');
    $('body').scrollTop();
    $('#results').fadeIn('slow');
  };

  resultsView.noResults = function() {
    $('#results').append('<h4>Sorry! No hikes match the criteria you\'ve selected.</h4><h4>Please try again!</h4><button id="re-try">Back to Filters</button>');
    $('button').on('click', function(){
      page('/filters');
    });
  };

  module.resultsView = resultsView;
})(window);
