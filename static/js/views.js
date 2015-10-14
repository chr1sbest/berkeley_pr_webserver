var AppView = Backbone.View.extend({
  // el - stands for element. Every view has a element associate in with HTML
  //      content will be rendered
  el: '#container',
  // Function called when this view is instantiated
  initialize: function(){
    this.render();
  },
  // Render our template to show new data
  render: function(){
    var template = Handlebars.compile(testTemplate);

   // Pass our data to the template
    var compiledHtml = template(this.model.attributes);

    // Set element to newly compiled template
    this.$el.html(compiledHtml);
  },
});
