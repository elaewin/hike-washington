(function(module) {

  var aboutView = {};

  aboutView.renderHumans = function(objToRender) {
    var templateCompiler = Handlebars.compile($('#about-template').text());
    this.name = objToRender.name;
    this.body = objToRender.body;
    this.bioPic = objToRender.bioPic;
    var renderedHuman = templateCompiler(this);
    $('#about').append(renderedHuman);
  };

})(window);
