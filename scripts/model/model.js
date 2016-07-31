(function(module) {
  var modelHikes = {};
// Make variable names more self-explainatory!
  modelHikes.placeholder = []; //array used to store Hikes as objects

  modelHikes.callTrailAPI = function() {
    $.ajax({
      url: 'https://trailapi-trailapi.p.mashape.com/?limit=800&q[state_cont]=Washington',
      method: 'GET',
      headers: {
        'X-Mashape-Key': 'nHipBFct8wmshrLdCiMjoNG1plAEp1WmBAqjsnP2SiB5C9Vcmp',
        'Accept': 'text/plain'
      },
      success: function(data, message, xhr) {
        console.log(data);
        data.places.map(function(current) {
          var place = {
            name: current.name,
            directions: current.directions,
            location: {
              lat: current.lat,
              lon: current.lon
            },
            activities: current.activities.map(function(element) {
              var activityInfo = {
                activity: element.activity_type_name,
                activityLength: element['length'],
                activityDesc: element['description']
              };
              return activityInfo;
            })
          };
          modelHikes.placeholder.push(place);
        });
      }
    }).done(function(){
      console.log(modelHikes.placeholder);
      sqlDB.createTable(sqlDB.insertRecord);
    });
  };

  module.modelHikes = modelHikes;
})(window);
