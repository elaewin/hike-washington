(function(module){

  function CreateFilters (opts) {
    this.category = opts.category;
    this.icons = opts.icons;
  }

  CreateFilters.all = [];

  CreateFilters.prototype.toHtml = function(scriptTemplateId) {
    var source = $(scriptTemplateId).text();
    var template = Handlebars.compile(source);
    return template(this);
  };

  //loading the new sections
  CreateFilters.loadAll = function(dataWePassIn) {
    dataWePassIn.forEach(function(ele) {
      CreateFilters.all.push(new CreateFilters(ele));
    });
  };

  CreateFilters.appendCreateFiltersSection = function() {
    CreateFilters.all.forEach(function(ele) {
      $('.filters').append(ele.toHtml('#filter-template'));
    });
  };

  CreateFilters.fetchAll = function() {
    $.ajax({
      type: 'GET',
      url: '/data/filter.json',
      dataType: 'json'
    }).fail(function(xhr, status, err){console.log(err);}).done(function(data) {
      CreateFilters.loadAll(data);
      console.log(data);
      CreateFilters.appendCreateFiltersSection();
    });
  };

  // CreateFilters.fetchAll();
  module.CreateFilters = CreateFilters;
})(window);
