// View for top Navbar.
var NavView = Backbone.View.extend({
  el: '#nav',

  initialize: function(){
    this.render();
  },

  render: function(){
    var NavPointer = this;
    $.get('frontend/templates/navbar.html', function(navbarTemplate){
      // get navbar html from our templates/navbar.html
      // Assign html for this element to the navbar.html template
      NavPointer.$el.html(navbarTemplate);
    });
    return this;
  },
});


// View for Rankings.
var RankingView = Backbone.View.extend({
  el: '#container',

  initialize: function(){
  },

  render: function(){
    var RankingPointer = this;
    $.get('frontend/templates/rankings.html', function(rankingsTemplate){
      // Compile handlebar template with the rankings.html template
      var template = Handlebars.compile(rankingsTemplate);
      // Pass our data to the template
      var compiledHtml = template(RankingPointer.model.attributes);
      // Set element to newly compiled template
      RankingPointer.$el.html(compiledHtml);
    });
    return this;
  },

  renderFailure: function(){
    this.$el.html('<p>Failed to retrieve data from API.</p>');
    return this;
  }
});


// View for About us.
var AboutView = Backbone.View.extend({
  el: '#container',

  initialize: function(){
    this.render()
  },

  render: function(){
    var AboutPointer = this;
    $.get('frontend/templates/about.html', function(about){
      AboutPointer.$el.html(about);
    });
    return this;
  }
});
