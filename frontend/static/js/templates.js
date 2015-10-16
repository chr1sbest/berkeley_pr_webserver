// List helper
Handlebars.registerHelper('list', function(items, options) {
  var out = "<ul class='main',style='list-style-type:none'>" + "<ul class='element'>" + "<li class='header rank format'>" + "Rank" + "</li>" + "<li class='header player format'>" + "Player" + "</li>" + "<li class='header rating format'>" + "Rating" + "</li>" + "</ul>" + "<br>";
  for(var i=0, l=items.length; i<l; i++) {
    var str = (options.fn(items[i]).split("--"));
	var a = i + 1	    
	var b = str[0];
    	var c = str[1].substring(0,7);
// alternating color per element
	if (i%2) {
	out = out + "<ul class='element'>" + "<li class='light rank format'>" + a + "</li>" + "<li class='light player format'>" + b + "</li>" + "<li class='light rating format'>" + c + "</li>" + "</ul>" + "<br>";
	}
	else {
	out = out + "<ul class='element'>" + "<li class='dark rank format'>" + a + "</li>" + "<li class='dark player format'>" + b + "</li>" + "<li class='dark rating format'>" + c + "</li>" + "</ul>" + "<br>";
} 
}
  return out + "</ol>";
});
