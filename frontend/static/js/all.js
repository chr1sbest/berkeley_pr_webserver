var AboutView = Backbone.View.extend({
  el: '#container',
  initialize: function () {
    this.render();
  },
  render: function () {
    var aboutPointer = this;
    $.get('frontend/templates/about.html', function (about) {
      aboutPointer.$el.html(about);
    });
    return this;
  }
});
var HomeView = Backbone.View.extend({
  el: '#container',
  initialize: function () {
    this.render();
  },
  render: function () {
    var homePointer = this;
    $.get('frontend/templates/home.html', function (home) {
      homePointer.$el.html(home);
    });
    return this;
  }
});
var LoginView = Backbone.View.extend({
  initialize: function () {
  },
  render: function () {
    var loginpointer = this;
    this.setElement('#login');
    $.get('frontend/templates/logged_out.html', function (logout) {
      loginpointer.$el.html(logout);
    });
    return this;
  },
  renderLoggedIn: function (name) {
    var loginpointer = this;
    this.setElement('#login');
    var name = name;
    $.get('frontend/templates/logged_in.html', function (loggedInTemplate) {
      var template = Handlebars.compile(loggedInTemplate);
      var compiledHtml = template({ name: name });
      loginpointer.$el.html(compiledHtml);
    });
    return this;
  }
});
var NavView = Backbone.View.extend({
  el: '#nav',
  initialize: function () {
    this.render();
  },
  render: function () {
    var navPointer = this;
    $.get('frontend/templates/navbar.html', function (navbarTemplate) {
      // get navbar html from our templates/navbar.html
      // Assign html for this element to the navbar.html template
      navPointer.$el.html(navbarTemplate);
      // Additionally, after successfully loading the navbar template,
      // we will also render the loginView portion of the navbar
      loginView.render();
    });
    return this;
  }
});
var PlayerView = Backbone.View.extend({
  el: '#playerView',
  initialize: function () {
  },
  render: function () {
    var playerPointer = this;
    $.get('frontend/templates/players.html', function (playerTemplate) {
      var temp = Handlebars.compile(playerTemplate);
      var compiled = temp(playerPointer.model.attributes);
      playerPointer.$el.html(compiled);
    });
    //clear search input
    $('#inputSearch').val('');
    //clear player results list
    $('#results').html('');
    return this;
  },
  renderFailure: function () {
    this.$el.html('<p>Failed to retrieve data from API.</p>');
    return this;
  }
});
var PlayersParentView = Backbone.View.extend({
  el: '#container',
  initialize: function () {
    this.render();
  },
  render: function () {
    var playersParent = '    <div class="panel panel-default">      <div class="panel-body">        <div id="searchView"></div>        <div id="playerView"></div>      </div>    </div>';
    this.$el.html(playersParent);
    return this;
  }
});
var PlayerSearchView = Backbone.View.extend({
  el: '#searchView',
  initialize: function () {
  },
  render: function () {
    var searchPointer = this;
    $.get('frontend/templates/search.html', function (search) {
      // Set search HTML
      searchPointer.$el.html(search);
      // Build list of player names out of backbone attributes hashtable
      var names = [];
      _.each(searchPointer.model.attributes, function (val, key) {
        names.push(val);
      });
      // Initialize Fuse object
      var fuseOptions = {
        caseSensitive: false,
        shouldSort: true,
        threshold: 0.2
      };
      searchPointer.fuseNames = new Fuse(names, fuseOptions);
      // Set event listener to watch input change
      $('#inputSearch').on('keyup', function () {
        searchPointer.search();
      });
      // HACK FIX THIS LATER
      // Set event listener to watch for button click
      $('#meButton').on('click', function () {
        var id = FB.getUserID();
        if (id == '') {
          alert('Please login with facebook (top-right)');
        } else {
          // If the user is logged in, direct them to the survey page.
          // Add current page URL to facebook user object
          var FBObject = user;
          var url_list = window.location.href.split('/');
          var url = url_list[url_list.length - 1];
          var FBObject = {
            participant: url,
            id: id
          };
          alert('Please copy paste the following text into the survey.:\n\n\n' + JSON.stringify(FBObject));
          // Open new window to survey
          var win = window.open('http://goo.gl/forms/TghLC2Zfek', '_blank');
          if (win) {
            //Browser has allowed it to be opened
            win.focus();
          } else {
            //Broswer has blocked it
            alert('Please allow popups for this site');
          }
        }
      });
    });
    return this;
  },
  search: function () {
    var searchPointer = this;
    // Use the current value of the search input to query fuse
    var $inputSearch = $('#inputSearch');
    var results = this.fuseNames.search($inputSearch.val());
    // Build a list of player links
    var playersHTML = '<ul>';
    _.each(results, function (index) {
      player = searchPointer.fuseNames.list[index];
      playerHTML = '<li><a href="#players/' + player + '">' + player + '</a></li>';
      playersHTML += playerHTML;
    });
    playersHTML += '</ul>';
    $('#results').html(playersHTML);
  }
});
var RankingView = Backbone.View.extend({
  el: '#container',
  initialize: function () {
  },
  render: function () {
    var rankingPointer = this;
    $.get('frontend/templates/rankings.html', function (rankingsTemplate) {
      // Compile handlebar template with the rankings.html template
      var template = Handlebars.compile(rankingsTemplate);
      // Pass our data to the template
      var compiledHtml = template(rankingPointer.model.attributes);
      // Set element to newly compiled template
      rankingPointer.$el.html(compiledHtml);
    });
    return this;
  },
  renderFailure: function () {
    this.$el.html('<p>Failed to retrieve data from API.</p>');
    return this;
  }
});
// Initialize navbar with login view
var navView = new NavView();
var loginView = new LoginView();
// Initialize facebook app
FB.init({ appId: '1705522486327956' });
var user = new FacebookUser();
var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'home',
    // Default route
    'rankings': 'rankings',
    'matches': 'matches',
    'tournaments': 'tournaments',
    'about': 'about',
    'login': 'login',
    'logout': 'logout',
    'players/:id': 'player',
    'players': 'playerSearch',
    'noop': 'noop'
  },
  home: function () {
    var homeView = new HomeView();
  },
  rankings: function () {
    var currentRanks = new Rankings();
    var rankingView = new RankingView({ model: currentRanks });
    // Fetch ranking data and update views accordingly
    currentRanks.fetch({
      success: function () {
        rankingView.render();
      },
      error: function () {
        rankingView.renderFailure();
      }
    });
  },
  about: function () {
    var aboutView = new AboutView();
  },
  player: function (id) {
    var playerModel = new Players({ id: id });
    var playerView = new PlayerView({ model: playerModel });
    playerModel.fetch({
      success: function () {
        playerView.render();
      },
      error: function () {
        playerView.renderFailure();
      }
    });
  },
  playerSearch: function () {
    // Initialize main player page
    var playerParent = new PlayersParentView();
    // Initialize search view
    var searchModel = new AllPlayers();
    var searchView = new PlayerSearchView({ model: searchModel });
    searchModel.fetch({
      success: function () {
        searchView.render();
      },
      error: function () {
        searchView.renderFailure();
      }
    });
  },
  login: function () {
    user.login(function (response) {
      FB.api('/me', function (response) {
        if (response && !response.error) {
          loginView.renderLoggedIn(response.name);
        } else {
          app_router.navigate('/noop');
        }
      });
    });
  },
  logout: function () {
    FB.getLoginStatus(function (response) {
      if (response && response.status === 'connected') {
        FB.logout(function (response) {
          loginView.render();
        });
      }
    });
  },
  noop: function () {
  }
});
// Initialize the router
var app_router = new AppRouter();
Backbone.history.start();
var Rankings = Backbone.Model.extend({ url: '/rankings' });
var Players = Backbone.Model.extend({
  url: function () {
    return '/players/' + this.id;
  }
});
var AllPlayers = Backbone.Model.extend({ url: '/players' });
Handlebars.registerHelper('list', function (items, options) {
  var out = '';
  var top_rating = items[0].rating;
  var cutoff = 0;
  for (var i = 0; items[i].rating > 0; i++) {
    cutoff += 1;
  }
  for (var i = 0, l = items.length; i < l; i++) {
    var item = items[i];
    var ranking = i + 1;
    // PLACEHOLDER, NEED PLAYER'S MAINS FOR STOCK ICONS
    var icon = '<img src = \'frontend/static/images/stock_icons/Sandbag.png\' alt= \'\' class = \'img_responsive\'> ';
    // PLACEHOLDER, EXAMPLE CODE TO GET PROPER STOCK ICON
    //var icon = "<img src = 'frontend/static/images/stock_icons/neutral " + items.character + "' alt= '' class = 'img_responsive'> "
    var player = item.player;
    // PLACEHOLDER, NEED TO HAVE W/L RECORD PULLED PER PLAYER
    var record = '30/30';
    // RATING OUT OF 100, NEGATIVE RATING BECOMES 0
    var rating = Math.round(item.rating / top_rating * 100000) / 1000;
    /*toString().substring(0,6);*/
    if (rating < 0) {
      rating = 0;
    }
    // PLACEHOLDER, DETERMINE LEAGUE BASED ON PERCENTAGE, NONE IF RATING = 0
    var lim_master = 4;
    var lim_diamond = 0.17;
    var lim_plat = 0.29;
    var lim_gold = 0.45;
    var lim_silver = 0.67;
    if (ranking < lim_master) {
      var league = 'master';
    } else if (ranking / cutoff < lim_diamond) {
      var league = 'diamond';
    } else if (ranking / cutoff < lim_plat) {
      var league = 'plat';
    } else if (ranking / cutoff < lim_gold) {
      var league = 'gold';
    } else if (ranking / cutoff < lim_silver) {
      var league = 'silver';
    } else if (ranking <= cutoff) {
      var league = 'bronze';
    } else {
      var league = 'unranked';
    }
    var out = out + '<tr>' + '<td>' + ranking + '</td>' + '<td>' + icon + '</td>' + '<td>' + player + '</td>' + '<td>' + record + '</td>' + '<td>' + rating + '</td>' + '<td>' + '<img src=\'frontend/static/images/leagues/' + league + '.png\' alt=\'\' style=\'img_responsive\'>' + '</td>' + '</tr>';
  }
  return out;
});
Handlebars.registerHelper('playerMatches', function (items, options) {
  console.log(items);
  var out = '';
  var player_data = items.data.root;
  var matches = player_data.matches;
  _.each(matches, function (match) {
    var date = '10/15/2015';
    var opp = match.opp;
    // CHANGE THIS LATER CHARLES
    var outcome = match.outcome;
    if (outcome == 'lose') {
      outcome = 'loss';
    }
    var tournament = match.tournament;
    out = out + '<tr class=\'' + outcome + '\'>' + '<td>' + date + '</td>' + '<td><a href=\'/#players/' + opp + '\'>' + opp + '</a></td>' + '<td>' + outcome + '</td>' + '<td>' + tournament + '<td>' + '</tr>';
  });
  return out;
});