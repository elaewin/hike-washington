page('/', home);
page('/filters', filters);
page('/results', results);
page('*', home);
page();

function home() {
  homeView.render();
}

function filters() {
  filtersView.render();
}

function results() {
  $('.page-content').hide();

  // resultsView.resultCount = 0;
  resultsView.render();
  $('#results').fadeIn();
}
