(function(module) {

  var aboutView = {};

  aboutView.renderAboutBio = function(objToRender) {
    console.log('renderAboutBio is running.');
    var templateCompiler = Handlebars.compile($('#about-template').text());
    this.name = objToRender.name;
    this.body = objToRender.body;
    this.bioPic = objToRender.bioPic;
    var renderedHuman = templateCompiler(this);
    return renderedHuman;
  };

  module.aboutView = aboutView;
})(window);
