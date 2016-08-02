(function(module) {

  var homeView = {};
  homeView.render = function() {
    console.log('homeView.render running');
    homeView.zipCode = 0;
    $('#zipCode-input').submit(function(event) {
      event.preventDefault();
    });
    homeView.redirect = function() {
      console.log('Redirect is running');
      homeView.zipCode = $('#autocomplete').val();
      if (homeView.zipCode.length === 5) {
        modelHikes.getLatLng(homeView.zipCode);
        page.redirect('/filters');
        console.log('Redirect working');
      } else {
        console.log('Not a valid zip code');
      }
    };
    $('#search-submit').on('click', homeView.redirect);

    modelHikes.loadAPIData();
  };
  module.homeView = homeView;
})(window);
