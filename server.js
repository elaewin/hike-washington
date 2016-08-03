var async = require('async');

var express = require('express'),
  requestProxy = require('express-request-proxy'),
  port = process.env.PORT || 3000,
  app = express();

var proxyTrailsAPI = function(request, response) {
  console.log(request);
  (
    requestProxy({
      url: 'https://trailapi-trailapi.p.mashape.com/' + '?limit=800&q[state_cont]=Washington' + '&mashape-key=' + process.env.MASHAPE_API_KEY + '&accept=text/plain'
      // headers: {
      //   'mashape-key': process.env.MASHAPE_API_KEY,
      //   'Accept': 'text/plain'
      // }
    })
  )(request, response);
};

var proxyGoogleAPI = function(request, response) {
  console.log('routing Google API request for', request.params[0]);
  (
    requestProxy({
      url: 'https://maps.googleapis.com/' + request.params[0],
      headers: {
        'key': process.env.GOOGLE_API_KEY
      }
    })
  )(request, response);
};

app.get('/trailsAPI', proxyTrailsAPI);

app.post('/theGoogles/*', proxyGoogleAPI);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
