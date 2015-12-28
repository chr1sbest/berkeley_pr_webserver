var PlayersParentView = Backbone.View.extend({
  el: '#container',

  initialize: function(){
    this.render();
  },

  //Allow mulistring to pass Linter
  /*jshint multistr: true */
  render: function(){
    var playersParent = '\
    <div class="panel panel-default">\
      <div class="panel-body">\
        <div id="searchView"></div>\
        <div id="playerView"></div>\
      </div>\
    </div>';
    this.$el.html(playersParent);
    return this;
  }
});
