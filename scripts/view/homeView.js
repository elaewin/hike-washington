(function(module) {
  var homeView = {};



  homeView.loadHome = function() {
    $('main').append('<section>HOME</section>');
    $('section').append('<form id="formData"></form>');
    $('form').append('<input type="text" placeholder="Enter ZIP">');
    $('form').append('<button id="button" type="button">GO HIKE</button>');

    $('#formData').submit(function(event) {
      event.preventDefault();
    });

    $('#button').click(function(){redirect(); return false;});

  };

  redirect = function() {
    console.log('this ran');
    page.redirect('/filters');
  };

  module.homeView = homeView;
})(window);
