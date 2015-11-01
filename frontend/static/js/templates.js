Handlebars.registerHelper('list', function(items, options) {
  var out = '';
  var top_rating = items[0].rating;
  var cutoff = 0;
  for(var i=0 ;items[i].rating > 0; i++) {
      cutoff += 1
  }
  for(var i=0, l=items.length; i<l; i++) {
    var item = items[i];
    var ranking = i + 1;	    
    // PLACEHOLDER, NEED PLAYER'S MAINS FOR STOCK ICONS
    var icon = "<img src = 'frontend/static/images/stock_icons/Sandbag.png' alt= '' class = 'img_responsive'> "
    // PLACEHOLDER, EXAMPLE CODE TO GET PROPER STOCK ICON
    //var icon = "<img src = 'frontend/static/images/stock_icons/neutral " + items.character + "' alt= '' class = 'img_responsive'> "
    var player = item.player;    
    // PLACEHOLDER, NEED TO HAVE W/L RECORD PULLED PER PLAYER
    var record = "30/30"
    // RATING OUT OF 100, NEGATIVE RATING BECOMES 0
    var rating = Math.round(item.rating/top_rating * 100000) / 1000/*toString().substring(0,6);*/
    if (rating < 0){
      rating = 0
    }
    // PLACEHOLDER, DETERMINE LEAGUE BASED ON PERCENTAGE, NONE IF RATING = 0
    var lim_master = 4
    var lim_diamond = .17
    var lim_plat = .29
    var lim_gold = .45
    var lim_silver = .67
    if (ranking < lim_master){
      var league = "master"
    }
    else if (ranking/cutoff < lim_diamond) {
      var league = "diamond"
    }
    else if (ranking/cutoff < lim_plat) {
      var league = "plat"
    }
    else if (ranking/cutoff < lim_gold) {
      var league = "gold"
    }
    else if (ranking/cutoff < lim_silver) {
      var league = "silver"
    }
    else if (ranking <= cutoff) {
      var league = "bronze"
    }
    else {
      var league = "unranked"
    }
    var out = out + "<tr>" + "<td>" + ranking + "</td>" + "<td>" + icon + "</td>" + "<td>" + player + "</td>" + "<td>" + record + "</td>" + "<td>" + rating + "</td>" + "<td>" + "<img src='frontend/static/images/leagues/" + league + ".png' alt='' style='img_responsive'>"+ "</td>" + "</tr>";
  }
  return out;
});

Handlebars.registerHelper('playerMatches', function(items, options) {
  var out = '';
  var player_data  = items.data.root;
  var matches = player_data['matches'];
  _.each(matches, function(match){
    var date = '10/15/2015';
    var opp = match['opp'];

    // CHANGE THIS LATER CHARLES
    var outcome = match['outcome'];
    if (outcome == "lose"){
      outcome = "loss";
    }

    var tournament = match['tournament'];
    out = out + "<tr class='" + outcome + "'>" + "<td>" + date + "</td>" + "<td><a href='/#players/" + opp + "'>" + opp + "</a></td>" + "<td>" + outcome + "</td>" + "<td>" + tournament + "<td>" + "</tr>";

  });
  return out
});
