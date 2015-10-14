// Initialize Navbar
var navView = new NavView();

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
