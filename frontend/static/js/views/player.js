var PlayerView = Backbone.View.extend({
  el: '#playerView',

  initialize: function(){
  },
  
  render:function(){
    var playerPointer = this;
    $.get('frontend/templates/players.html', function(playerTemplate){
      var temp = Handlebars.compile(playerTemplate)
      var compiled = temp(playerPointer.model.attributes);
      playerPointer.$el.html(compiled);
    });
    
    //clear search input
    $("#inputSearch").val('');
    
    //clear player results list
    $("#results").html('');
    return this;
  },

  renderFailure: function(){
    this.$el.html('<p>Failed to retrieve data from API.</p>');
    return this;
  }

});
