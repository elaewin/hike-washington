'use strict';

(function(module){

  var aboutController = {};

  aboutController.generateBios = function() {
    $('.page-content').hide();
    aboutModel.allHumans.forEach(function(bioObj) {
      var renderedBio = aboutView.renderAboutBio(bioObj);
      $('#about').append(renderedBio);
    });
    $('.header-h1').css('visibility', 'visible');
    $('#about').fadeIn('slow').scrollTop();
  };

  module.aboutController = aboutController;
})(window);
