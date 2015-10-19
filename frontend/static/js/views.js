// View for top Navbar.
var NavView = Backbone.View.extend({
  el: '#nav',

  initialize: function(){
    this.render();
  },

  render: function(){
    var navPointer = this;
    $.get('frontend/templates/navbar.html', function(navbarTemplate){
      // get navbar html from our templates/navbar.html
      // Assign html for this element to the navbar.html template
      navPointer.$el.html(navbarTemplate);
    });
    return this;
  },
});


var RankingView = Backbone.View.extend({
  el: '#container',

  initialize: function(){
  },

  render: function(){
    var rankingPointer = this;
    $.get('frontend/templates/rankings.html', function(rankingsTemplate){
      // Compile handlebar template with the rankings.html template
      var template = Handlebars.compile(rankingsTemplate);
      // Pass our data to the template
      var compiledHtml = template(rankingPointer.model.attributes);
      // Set element to newly compiled template
      rankingPointer.$el.html(compiledHtml);
    });
    return this;
  },

  renderFailure: function(){
    this.$el.html('<p>Failed to retrieve data from API.</p>');
    return this;
  }
});


var PlayerView = Backbone.View.extend({
  el: '#playerView',

  initialize: function(){
  },
  
  render:function(){
    var playerPointer = this;
    $.get('frontend/templates/player.html', function(playerTemplate){
      var temp = Handlebars.compile(playerTemplate)
      var compiled = temp(playerPointer.model.attributes);
      playerPointer.$el.html(compiled);
    });
    return this;
  },

  renderFailure: function(){
    this.$el.html('<p>Failed to retrieve data from API.</p>');
    return this;
  }

});


var PlayerSearchView = Backbone.View.extend({
  el: '#searchView',

  initialize: function(){
  },

  render: function(){
    var searchPointer = this;

    $.get('frontend/templates/search.html', function(search){
      // Set search HTML
      searchPointer.$el.html(search);

      // Build list of player names out of backbone attributes hashtable
      var names = [];
      _.each(searchPointer.model.attributes, function(val, key) {
        names.push(val);
      });

      // Initialize Fuse object
      var fuseOptions = {
        caseSensitive: false,
        shouldSort: true,
        threshold: 0.2,
        //keys: ["title","author.firstName"]
      };
      searchPointer.fuseNames = new Fuse(names, fuseOptions)

      // Set event listener to watch input change
      $("#inputSearch").on('keyup', function() {
        searchPointer.search()
      });
    });
    return this;
  },

  search: function(){
    var searchPointer = this;

    // Use the current value of the search input to query fuse
    var $inputSearch = $('#inputSearch');
    var results = this.fuseNames.search($inputSearch.val());

    // Build a list of player links
    var playersHTML = '<ul>';
    _.each(results, function(index) {
      player = searchPointer.fuseNames.list[index]
      playerHTML = '<li><a href="#players/' + player + '">' + player + '</a></li>';
      playersHTML += playerHTML
    });
    playersHTML += '</ul>';

    $("#results").html(playersHTML);
  }
});


var AboutView = Backbone.View.extend({
  el: '#container',

  initialize: function(){
    this.render()
  },

  render: function(){
    var aboutPointer = this;
    $.get('frontend/templates/about.html', function(about){
      aboutPointer.$el.html(about);
    });
    return this;
  }
});


var PlayersParentView = Backbone.View.extend({
  el: '#container',

  initialize: function(){
    this.render()
  },

  render: function(){
    var playersParent = '\
    <div class="panel panel-default">\
      <div class="panel-body">\
        <div id="searchView"></div>\
        <div id="playerView"></div>\
      </div>\
    </div>';
    this.$el.html(playersParent);
    return this;
  }
});
