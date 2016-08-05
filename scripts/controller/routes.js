page('/',
  homeController.loadData,
  homeController.index);

page('/filters', filterController.index);

page('/results',
  resultsController.updateResultsDB);

page('/about', aboutModel.getData);

page();
