(function(module) {

  var filterController = {};
  filterController.activityChoice = ['hiking'];
  filterController.distanceChoice = [0,1];

  filterController.handleDistanceSelections = function() {
    $('#distance li').on('click', function(event) {
      console.log('click');
      var $selection = $(event.target);
      if($selection.hasClass('active')) {
        $selection.removeClass('active');
      } else {
        $selection.addClass('active').siblings($selection).removeClass('active');
        distanceValues = $selection.attr('value');
        filterController.distanceChoice = [parseInt(distanceValues.split(',')[0]), parseInt(distanceValues.split(',')[1])];
        console.log(filterController.distanceChoice);
      }
      resultsModel.joinAllHikesAndDistance();
    });
  };

  filterController.handleActivitySelections = function() {
    $('#activity li').on('click', function(event){
      var $selection = $(event.target);
      if($selection.hasClass('active')){
        $selection.removeClass('active');
      } else {
        $selection.addClass('active');
      }
    });
  };

  filterController.handleScenerySelections = function() {
    $('#scenery li').on('click', function(event){
      var $selection = $(event.target);
      if($selection.hasClass('active')){
        $selection.removeClass('active');
      } else {
        $selection.addClass('active');
      }
    });
  };

  //find activites that have been clicked
  filterController.findActiveActivities = function() {
    $('.other-activity.active').each(function(){
      // console.log($(this));
      filterController.activityChoice.push($(this).attr('value'));
    });
  };

  filterController.index = function() {
    console.log('filter index is running');
    filtersView.clearData();
    filtersView.loadDistanceFilters();
    filtersView.loadActivityFilters();
    filtersView.loadSceneryFilters();
    filterController.handleDistanceSelections();
    filterController.handleActivitySelections();
    filterController.handleScenerySelections();
    filtersView.submitEventListener();
    resultsModel.joinAllHikesAndDistance();
  };

  module.filterController = filterController;
})(window);
