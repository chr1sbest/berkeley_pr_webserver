// Initialize Navbar
var navView = new NavView();

// Build application router
var AppRouter = Backbone.Router.extend({
  routes: {
    "": "rankings", // Default route
    "rankings": "rankings",
    "matches": "matches",
    "tournaments": "tournaments",
    "about": "about",
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
  }
});

// Initiate the router
var app_router = new AppRouter;
Backbone.history.start()
