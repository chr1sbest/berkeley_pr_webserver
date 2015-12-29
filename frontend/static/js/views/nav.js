var NavView = Backbone.View.extend({
  el: '#nav',

  initialize: function(){
    this.render();
  },

  render: function(){
    var navPointer = this;
    $.get('frontend/templates/navbar.html', function(navbarTemplate){
      // get navbar html from our templates/navbar.html
      // Assign html for this element to the navbar.html template
      navPointer.$el.html(navbarTemplate);
      // Additionally, after successfully loading the navbar template,
      // we will also render the loginView portion of the navbar
      loginView.render();

      // Hide collapsed navbar when clicking link (for mobile users)
      $(".navbar-nav").on("click", function() {
        $(".navbar-collapse").collapse('hide');
      });
    });
    return this;
  },
});

