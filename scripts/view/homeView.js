(function(module) {

  var homeView = {};

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

  $('#search-submit').on('click', homeView.redirect);

  module.homeView = homeView;
})(window);
