var AppRouter = Backbone.Router.extend({
  routes: {
    "": "home", // Default route
    "rankings": "rankings",
    "matches": "matches",
    "tournaments": "tournaments",
    "about": "about",
    "login": "login",
    "logout": "logout",
    "players/:id": "player",
    "players": "playerSearch",
    "noop": "noop"
  },
  home: function(){
    var homeView = new HomeView();
  },

  rankings: function(){
    var currentRanks = new Rankings();
    var rankingView = new RankingView({model: currentRanks});
    // Fetch ranking data and update views accordingly
    currentRanks.fetch({
      success: function() {
        rankingView.render();
      },
      error: function() {
        rankingView.renderFailure();
      }
    });
  },

  about: function(){
    var aboutView = new AboutView();
  },

  player: function(id){
    var playerModel = new Players({id: id});
    var playerView = new PlayerView({model: playerModel});
    playerModel.fetch({
      success: function() {
        playerView.render();
      },
      error: function() {
        playerView.renderFailure();
      }
    });
  },

  playerSearch: function(){
    // Initialize main player page
    var playerParent = new PlayersParentView();

    // Initialize search view
    var searchModel = new AllPlayers();
    var searchView = new PlayerSearchView({model: searchModel});
    searchModel.fetch({
      success: function() {
        searchView.render();
      },
      error: function() {
        searchView.renderFailure();
      }
    });
  },

  login: function(){
    user.login(function(response){
      FB.api('/me', function(response) {
        if (response && !response.error) {
          loginView.renderLoggedIn(response.name);
        } else {
          app_router.navigate('/noop');
        }
      });
    });
  },

  logout: function(){
    FB.getLoginStatus(function(response) {
      if (response && response.status === 'connected') {
        FB.logout(function(response) {
            loginView.render();
        });
      }
    });
  },

  noop: function(){
  },

//   matches: function(){
//   },

//   tournaments: function(){
//   },
});


// Initialize the router
var app_router = new AppRouter();
Backbone.history.start();
