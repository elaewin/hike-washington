// var baseUrl = 'https://ridb.recreation.gov/api/v1/';
// var authParam = '?apikey=300070357BB44A5E840841EEB4552CE8';
var baseUrlAlt = 'https://trailapi-trailapi.p.mashape.com/';
var authKey = 'KLpWSysVJTmshDzPyETfAf7t3KLhp1enYfsjsnb8fX4wPIx2Wd';
var acceptType = 'text/plain';

$.ajax({
  url: baseUrlAlt + '?q[state_cont]=Washington',
  type: 'GET',
  headers: {
    'X-Mashape-Key': authKey,
    'Accept' : acceptType
  },
  success: function(data, message, xhr) {
    console.log(data);
  }
}).done(function(data){
  // pass
});
