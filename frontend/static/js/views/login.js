var LoginView = Backbone.View.extend({
  initialize: function(){
  },

  render: function(){
    var loginpointer = this;
    this.setElement('#login');
    $.get('frontend/templates/logged_out.html', function(logout){
      loginpointer.$el.html(logout);
    });
    return this;
  },

  renderLoggedIn: function(name){
    var loginpointer = this;
    this.setElement('#login');
    name = name;
    $.get('frontend/templates/logged_in.html', function(loggedInTemplate){
      var template = Handlebars.compile(loggedInTemplate);
      var compiledHtml = template({name: name});
      loginpointer.$el.html(compiledHtml);
    });
    return this;
  }
});
