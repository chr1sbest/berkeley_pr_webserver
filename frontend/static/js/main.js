// Initialize Navbar
var navView = new NavView();
var loginView = new LoginView()

FB.init({appId: '1705522486327956'})

// Build application router
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
  },

  home: function(){
    this.rankings()
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
        if (response && !response.error) {
          loginView.renderLoggedIn(response.name)
        }
      });
    });
  },

  logout: function(){
    FB.getLoginStatus(function(response) {
      if (response && response.status === 'connected') {
        FB.logout(function(response) {
            loginView.render()
        });
      }
    });
  }
});

// Initiate the router
var app_router = new AppRouter;
Backbone.history.start()

