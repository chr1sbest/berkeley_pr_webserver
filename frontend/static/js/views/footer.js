var FooterView = Backbone.View.extend({
  el: '#footer-div',

  initialize: function(){
    this.render();
  },

  render: function(){
    var footerPointer = this;
    $.get('frontend/templates/footer.html', function(footer){
      footerPointer.$el.html(footer);
    });
    return this;
  },
});

