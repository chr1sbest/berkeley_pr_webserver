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
    "players": "playerSearch"
  },

  // Initialize rankingView and currentRanks model
  rankings: function(){
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

//   matches: function(){
//   },

//   tournaments: function(){
//   },

  about: function(){
    var aboutView = new AboutView();
  },

  player: function(id){
    // Initialize main player page
    var playerParent = new PlayersParentView();

    // Initialize search view
    var searchModel = new AllPlayers();
    var searchView = new PlayerSearchView({model: searchModel})
    searchModel.fetch({
      success: function() {
        searchView.render()
      },
      error: function() {
        searchView.renderFailure()
      }
    });

    // Initialize individual player view
    var playerModel = new Players({id: id});
    var playerView = new PlayerView({model: playerModel});
    playerModel.fetch({
      success: function() {
        playerView.render()
      },
      error: function() {
        playerView.renderFailure()
      }
    });
  },

  playerSearch: function(){
    // Initialize main player page
    var playerParent = new PlayersParentView();

    // Initialize search view
    var searchModel = new AllPlayers();
    var searchView = new PlayerSearchView({model: searchModel})
    searchModel.fetch({
      success: function() {
        searchView.render()
      },
      error: function() {
        searchView.renderFailure()
      }
    });
  }
});

// Initiate the router
var app_router = new AppRouter;
Backbone.history.start()
