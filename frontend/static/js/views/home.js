var HomeView = Backbone.View.extend({
  el: '#container',

  initialize: function(){
    this.render()
  },

  render: function(){
    var homePointer = this;
    $.get('frontend/templates/home.html', function(home){
      homePointer.$el.html(home);
    });
    return this;
  }
});

