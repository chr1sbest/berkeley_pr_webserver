// List helper
Handlebars.registerHelper('list', function(items, options) {
  var out = '';
  for(var i=0, l=items.length; i<l; i++) {
    var item = items[i];
    var ranking = i + 1;	    
    var player = item.player;
    var rating = Math.round(item.rating * 1000) / 1000/*toString().substring(0,6);*/

    var out = out + "<tr>" + "<td>" + ranking + "</td>" + "<td>" + player + "</td>" + "<td>" + rating + "<td>" + "</tr>";
  }
  return out;
});


Handlebars.registerHelper('playerMatches', function(items, options) {
  console.log(items);
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
