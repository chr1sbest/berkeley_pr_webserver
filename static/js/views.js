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
    var templateString = "<p>You can find me in {{player}}. My address is {{rank}} {{rating}}.</p>";
    var newTemplateString = "{{#list data}}{{player}} {{rank}} {{rating}}{{/list}}";
    var template = Handlebars.compile(newTemplateString);

   // Pass our data to the template

    var compiledHtml = template(this.model.attributes);

    // Set element to newly compiled template
    this.$el.html(compiledHtml);
  },
});

