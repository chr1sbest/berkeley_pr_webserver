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


