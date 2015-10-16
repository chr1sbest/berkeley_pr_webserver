// Initialize Navbar
var navView = new NavView();

FB.init({appId: '1705522486327956'})

// Build application router
var AppRouter = Backbone.Router.extend({
  routes: {
    "": "rankings", // Default route
    "rankings": "rankings",
    "matches": "matches",
    "tournaments": "tournaments",
    "about": "about",
    "login": "login",
    "players/:id": "player",
  },

  rankings: function(){
    // Initialize rankingView and currentRanks model
    var currentRanks = new Rankings();
    var rankingView = new RankingView({model: currentRanks});
    // Fetch ranking data and update views accordingly
    currentRanks.fetch({
      success: function() {
        rankingView.render()
      },
      error: function() {
        rankingView.renderFailure()
      }
    });
  },

  matches: function(){
  },

  tournaments: function(){
  },

  about: function(){
    var aboutView = new AboutView();
  },

  player: function(id){
  },

  login: function(){
    var user = new FacebookUser();
    user.login(function(response){
      FB.api('/me', function(response) {
        $("#name-display").html("<a>" + response.name + "</a>");
      });
    });
  }
});

// Initiate the router
var app_router = new AppRouter;
Backbone.history.start()

