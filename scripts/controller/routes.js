page('/', home);
page('/filters', filters);
page('/results', results);
page('*', home);
page();

function home() {
  homeView.loadHome();
}

function filters() {
  filtersView.render();
}

function results() {
  resultsView.render();
}
