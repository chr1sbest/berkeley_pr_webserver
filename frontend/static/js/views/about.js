var AboutView = Backbone.View.extend({
  el: '#container',

  initialize: function(){
    this.render();
  },

  render: function(){
    var aboutPointer = this;
    $.get('frontend/templates/about.html', function(about){
      aboutPointer.$el.html(about);
    });
    return this;
  }
});
