(function(module) {

  var aboutModel = {};

  function Human(opts) {
    for(var key in opts) this[key] = opts[key];
  };

  aboutModel.allHumans = [];

  aboutModel.getData = function() {
    $.getJSON({
      url: '../data/about.json',
      success: function(data, message, xhr) {
        data.forEach(function(cur) {
          aboutModel.allHumans.push(cur);
        });
      }
    }).done(aboutController.generateBios);
  };

  module.aboutModel = aboutModel;
})(window);
