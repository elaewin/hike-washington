(function(module) {

  var homeView = {};

  homeView.render = function() {
    $('.page-content').hide();
    $('#search').fadeIn();
    homeView.zipCode = 0;
    $('#zipCode-input').submit(function(event) {
      event.preventDefault();
    });

    homeView.redirect = function() {
      var zipEntered = /\d\d\d\d\d/;
      homeView.zipCode = $('#autocomplete').val();
      if (homeView.zipCode.match(zipEntered)) {
        modelHikes.getLatLng(homeView.zipCode);
        console.log('Redirect working');
      } else {
        $('#autocomplete').css({'border-color': 'red'});
        $('#autocomplete').val('');
        $('#autocomplete').attr('placeholder', 'That\'s not a zipcode..');
        console.log('Not a valid zip code');
      }
    };

    homeView.callback = function() {
      console.log('callback has been reached');
    };

    homeView.Run = function() {
      async.series([
        allHikesModel.createTable(),
        allHikesModel.insertRecord(),
        distancesModel.createTable(),
        resultsModel.createResultsDB()
      ], homeView.callback());
    };

    $('#search-submit').on('click', homeView.redirect);

    modelHikes.checkDistanceForData();
    modelHikes.checkResultsForData();
    modelHikes.loadAPIData(); //happen on page load
    homeView.Run();  // on page load

  };
  module.homeView = homeView;
})(window);
