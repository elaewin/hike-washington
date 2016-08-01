(function(module) {
  var homeView = {};
  homeView.loadHome = function() {
    $('main').append('<section>HOME</section>');
    $('section').append('<form id="formData"></form>');
    $('form').append('<input type="text" hikesArray="Enter ZIP">');
    $('form').append('<button id="button" type="button">GO HIKE</button>');
    $('#formData').submit(function(event) {
      event.preventDefault();
    });
    $('#button').click(function(){redirect(); return false;});
  };
  redirect = function() {
    page.redirect('/filters');
  };
  module.homeView = homeView;
})(window);
