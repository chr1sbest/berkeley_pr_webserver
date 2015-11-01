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
      // Additionally, after successfully loading the navbar template,
      // we will also render the loginView portion of the navbar
      loginView.render()
    });
    return this;
  },
});

var HomeView = Backbone.View.extend({
  el: '#container',

  initialize: function(){
    this.render()
  },

  render: function(){
    var homePointer = this;
    $.get('frontend/templates/home.html', function(home){
      homePointer.$el.html(home);
    });
    return this;
  }
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
    $.get('frontend/templates/players.html', function(playerTemplate){
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

      // HACK FIX THIS LATER
      // Set event listener to watch for button click
      $("#meButton").on("click", function(){
        var id = FB.getUserID()
        if (id == "") {
          alert("Please login with facebook (top-right)");
        } else {
          // If the user is logged in, direct them to the survey page.
          // Add current page URL to facebook user object
          var FBObject = user;
          var url_list = window.location.href.split('/');
          var url = url_list[url_list.length - 1];
          var FBObject = {participant: url, id: id}
          alert('Please copy paste the following text into the survey.:\n\n\n' + JSON.stringify(FBObject));

          // Open new window to survey
          var win = window.open('http://goo.gl/forms/TghLC2Zfek', '_blank');
          if(win){
            //Browser has allowed it to be opened
            win.focus();
          } else{
            //Broswer has blocked it
            alert('Please allow popups for this site');
          }
        }
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


var LoginView = Backbone.View.extend({
  initialize: function(){
  },

  render: function(){
    var loginpointer = this;
    this.setElement('#login')
    $.get('frontend/templates/logged_out.html', function(logout){
      loginpointer.$el.html(logout);
    });
    return this;
  },

  renderLoggedIn: function(name){
    var loginpointer = this;
    this.setElement('#login')
    var name = name;
    $.get('frontend/templates/logged_in.html', function(loggedInTemplate){
      var template = Handlebars.compile(loggedInTemplate);
      var compiledHtml = template({name: name});
      loginpointer.$el.html(compiledHtml);
    });
    return this;
  }
});
