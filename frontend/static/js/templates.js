// List helper
Handlebars.registerHelper('list', function(items, options) {
  var out = "<ol style='text-align:center'>";
  for(var i=0, l=items.length; i<l; i++) {
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }
  return out + "</ol>";
});
