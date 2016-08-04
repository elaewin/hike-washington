page('/',
  homeController.loadData,
  homeController.index);

page('/filters',
  resultsModel.joinAllHikesAndDistance);

page('/results',
  resultsController.updateResultsDB);

page('/about', aboutModel.getData);

page();

function filters() {
  filtersView.render();
}
