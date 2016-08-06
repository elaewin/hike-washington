(function(module) {

  var filterController = {};

  filterController.distanceChoice = [0,1];

  filterController.handleDistanceSelections = function() {
    $('#distance li').on('click', function(event) {
      var $selection = $(event.target);
      if($selection.hasClass('active')) {
        $selection.removeClass('active');
      } else {
        $selection.addClass('active').siblings($selection).removeClass('active');
        distanceValues = $selection.attr('value');
        filterController.distanceChoice = [parseInt(distanceValues.split(',')[0]), parseInt(distanceValues.split(',')[1])];
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

  filterController.findActiveActivities = function() {
    filterController.activityChoice = ['hiking'];
    $('.other-activity.active').each(function(){
      filterController.activityChoice.push($(this).attr('value'));
    });
  };

  filterController.findActiveScenery = function() {
    filterController.sceneryChoice = [''];
    $('.other-scenery.active').each(function(){
      filterController.sceneryChoice.push($(this).attr('value'));
    });
  };

  filterController.index = function() {
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
