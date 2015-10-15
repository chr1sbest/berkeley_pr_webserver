var Rankings = Backbone.Collection.extend({
  url: '/rankings',
  model: Backbone.Model
});

var AppView = Backbone.View.extend({
  // el - stands for element. Every view has a element associate in with HTML
  //      content will be rendered.
  el: '#container',
  // It's the first function called when this view it's instantiated.
  initialize: function(){
    this.render();
  },
  // $el - it's a cached jQuery object (el), in which you can use jQuery functions
  //       to push content. Like the Hello World in this case.
  render: function(){
    var newTemplateString = "{{#list data}}{{rank}}. {{player}} ({{rating}}){{/list}}";
    var template = Handlebars.compile(newTemplateString);

   // Pass our data to the template

    var compiledHtml = template(this.model.attributes);

    // Set element to newly compiled template
    this.$el.html(compiledHtml);
  },
});


// List helper
Handlebars.registerHelper('list', function(items, options) {
  var out = "<ul>";
  for(var i=0, l=items.length; i<l; i++) {
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }
  return out + "</ul>";
});


// Fetch current rankings and build AppView upon success
var currentRanks = new Rankings();
currentRanks.fetch({
  success: function() {
    var appView = new AppView({model: currentRanks.models[0]});
  },
  error: function() {
    console.log("Failed to retrieve json from API");
  }
});
