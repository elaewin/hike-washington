(function(module) {
  var resultsView = {};
  var resultsCompiler = Handlebars.compile($('#results-template').text());

  resultsView.render = function() {
    $('main').html('');
    $('main').append('<section>Results</section>');
    sqlDB.toHTML(5,resultsView.generateList);
  };

  resultsView.generateList = function() {
    sqlDB.displayHikes.forEach(function(rows){
      $('section').append(rows.map(function(row) {
        return $('<p>' + row.name + ' : ' + row.activities + ' : ' + row['length'] + '</p>');}));
    });
  };

  

  module.resultsView = resultsView;
})(window);
