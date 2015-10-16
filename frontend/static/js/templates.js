// List helper
Handlebars.registerHelper('list', function(items, options) {
  var out = "<ol style='text-align:center'>";
  for(var i=0, l=items.length; i<l; i++) {
    var str = (options.fn(items[i]).split("--"));
    var a = str[0];
    var b = str[1];
    out = out + a +  "<li style ='text-align:right'>" + b + "</li>";
  }
  return out + "</ol>";
});
