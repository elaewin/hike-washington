(function(module){

  function Work (opts) {
    this.icons = opts.icons;
  }

  Distance.all = [];

  Distance.prototype.toHtml = function(scriptTemplateId) {
    var source = $(scriptTemplateId).text();
    var template = Handlebars.compile(source);
    return template(this);
  };

  //loading the new sections
  Distance.loadAll = function(dataWePassIn) {
    dataWePassIn.forEach(function(ele) {
      Distance.all.push(new Distance(ele));
    });
  };

  Distance.appendDistanceSection = function() {
    Distance.all.forEach(function(ele) {
      $('.distance').append(ele.toHtml('#distance-template'));
    });
  };

  Distance.fetchAll = function() {
    if (localStorage.distance) {
      Distance.loadAll(JSON.parse(localStorage.Distance));
      Distance.appendDistanceSection();
    } else {
      // Load our json data
      $.ajax({
        type: 'GET',
        url: '/data/distance.json',
        dataType: 'json'
      }).done(function(data) {
        // Store that data in localStorage so we can skip the server call next time
        localStorage.Distance = JSON.stringify(data);
        Distance.loadAll(data);
        Distance.appendDistanceSection();
      });
    }
  };

  Distance.fetchAll();
  module.Distance = Distance;
})(window);
