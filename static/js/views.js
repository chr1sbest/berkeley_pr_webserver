var NavView = Backbone.View.extend({
  el: '#nav',

  initialize: function(){
    this.render();
  },

  render: function(){
    var NavPointer = this;
    //  get navHTML from our templates/navbar.html!
    $.get('static/templates/navbar.hb', function(navbarHb){
      // Assign html for this element to the navbar.hb template
      NavPointer.$el.html(navbarHb);
    });
  },
});


var RankingView = Backbone.View.extend({
  // el - stands for element. Every view has a element associate in with HTML
  //      content will be rendered
  el: '#container',

  // Function called when this view is instantiated
  initialize: function(){
    this.render();
  },

  // Render our template to show new data
  render: function(){

    var RankingPointer = this;

    $.get('static/templates/rankings.hb', function(rankingsTemplate){
      // Compile handlebar template with the .hb template
      var template = Handlebars.compile(rankingsTemplate);
      // Pass our data to the template
      var compiledHtml = template(RankingPointer.model.attributes);
      // Set element to newly compiled template
      RankingPointer.$el.html(compiledHtml);
    });

  },
});
