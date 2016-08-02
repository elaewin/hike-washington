(function(module) {

  var homeView = {};
  homeView.zipCode = 0;

  // add event listener on form to initate redirect

  redirect = function() {
    homeView.zipCode = $('#autocomplete').val();
    if (homeView.zipCode.length === 5) {
      modelHikes.getLatLng(homeView.zipCode);
      page.redirect('/filters');
    } else {
      console.log('Not a valid zip code');
    }
  };

  modelHikes.loadAPIData();

  module.homeView = homeView;
})(window);
