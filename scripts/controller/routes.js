page('/',
  homeController.loadData,
  homeController.index);

page('/filters', filters);
page('/results', resultsController.render);

page('/about', aboutModel.getData);

page();

function filters() {
  filtersView.render();
}

function results() {
  $('.page-content').hide();
  $('#results').fadeIn();
  // resultsView.resultCount = 0;
  resultsView.render();
}
