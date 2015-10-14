// Initialize Navbar
var navView = new NavView();

// Fetch current rankings and build AppView upon success
var currentRanks = new Rankings();
currentRanks.fetch({
  success: function() {
    var appView = new RankingView({model: currentRanks.models[0]});
  },
  error: function() {
    console.log("Failed to retrieve json from API");
  }
});
