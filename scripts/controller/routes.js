page('/',
  homeController.loadData,
  homeController.index);

page('/filters',
  resultsModel.joinAllHikesAndDistance,
  filterController.index);

page('/results',
  resultsController.updateResultsDB);

page('/about', aboutModel.getData);

page();
