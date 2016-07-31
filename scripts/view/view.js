(function(module) {
  var viewHikes = {};

//Sample function to see if I could get data on the browser (Doug)
  viewHikes.generateList = function() {
    sqlDB.displayHikes.forEach(function(rows){
      $('main').append(rows.map(function(row) {
        return $('<p>' + row.name + ' : ' + row.activities + ' : ' + row['length'] + '</p>');}));
    });
  };

  module.viewHikes = viewHikes;
})(window);
