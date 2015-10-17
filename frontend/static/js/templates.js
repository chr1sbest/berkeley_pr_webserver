// List helper
Handlebars.registerHelper('list', function(items, options) {
  var out = "<table class='table table-striped'>" + "<thead>" + "<tr>" + "<th>Rank</th>" + "<th>Player</th>" + "<th>Rating</th>" + "</tr>" + "</thead>" + "<tbody>";
  for(var i=0, l=items.length; i<l; i++) {
        var item = items[i];
	var ranking = i + 1;	    
	var player = item.player;
    	var rating = Math.round(item.rating * 1000) / 1000/*toString().substring(0,6);*/
	var out = out + "<tr>" + "<td>" + ranking + "</td>" + "<td>" + player + "</td>" + "<td>" + rating + "<td>" + "</tr>";
  }
  return out + "</tbody>" + "</table>";
});
