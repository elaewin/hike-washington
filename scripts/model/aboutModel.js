(function(module) {

  var aboutModel = {};

  function Human(opts) {
    for(var key in opts) this[key] = opts[key];
  };

  aboutModel.getData = function() {
    $.getJSON({
      url: '../data/about.json',
      success: function(data, message, xhr) {
        data.forEach(function(cur) {
          aboutView.renderHumans(cur);
        });
      }
    });
  };

})(window);
