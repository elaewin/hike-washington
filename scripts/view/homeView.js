(function(module) {

  var homeView = {};
  homeView.zipCode = 0;

  homeView.loadHome = function() {
    $('main').append('<section></section>');
    $('section').append('<form id="formData"></form>');
    $('form').append('<input type="text" id="zipEntry" hikesArray="Enter ZIP">');
    $('form').append('<button id="button" type="button">GO HIKE</button>');
    $('#formData').submit(function(event) {
      event.preventDefault();
    });
    $('#button').click(function(){redirect(); return false;});
  };
  redirect = function() {
    homeView.zipCode = $('#zipEntry').val();
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
