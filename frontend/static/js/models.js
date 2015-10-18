var Rankings = Backbone.Model.extend({
  url: '/rankings',
});

var Players = Backbone.Model.extend({
  url: function() {
    return '/players/' + this.id
  },
});
