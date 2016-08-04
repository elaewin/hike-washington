(function(module) {

  var homeView = {};

  modelHikes.loadAPIData(); //happen on page load

  homeView.render = function() {
    $('.page-content').hide();
    $('#search').fadeIn();
    homeView.zipCode = 0;
    $('#zipCode-input').submit(function(event) {
      event.preventDefault();
    });

    homeView.redirect = function() {
      homeView.zipCode = $('#autocomplete').val();
      if (homeView.zipCode.length === 5) {
        modelHikes.getLatLng(homeView.zipCode);
        // page.redirect('/filters');
        console.log('Redirect working'); //add error validation (non INTEGER)
      } else {
        console.log('Not a valid zip code');
      }
    };

    $('#search-submit').on('click', homeView.redirect);

  };
  module.homeView = homeView;
})(window);
