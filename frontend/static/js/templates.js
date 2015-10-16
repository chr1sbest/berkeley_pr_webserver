// List helper
Handlebars.registerHelper('list', function(items, options) {
  var out = "<ul style='list-style-type:none'>";
  for(var i=0, l=items.length; i<l; i++) {
    var str = (options.fn(items[i]).split("--"));
	var a = i + 1	    
	var b = str[0];
    	var c = str[1];
    out = out + "<ul class='item'>" + "<li class='rank'>" + a + "</li>" + "<li class='name'>" + b + "</li>" + "<li class='rating'>" + c + "</li>" + "</ul>" + "<br>";
 }
  return out + "</ol>";
});
