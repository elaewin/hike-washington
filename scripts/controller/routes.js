page('/', homeController.loadData);

page('/filters', filterController.index);

page('/results',
  resultsController.updateResultsDB);

page('/about', aboutModel.getData);

page();
