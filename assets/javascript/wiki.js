$(document).ready(function() {

  $(".search-button").click(function(){

    var searchTerm = $(".input-text").val();

    var toTitleCase = function (searchTerm) {
      searchTerm = searchTerm.toLowerCase().split(' ');
      for (var i = 0; i < searchTerm.length; i++) {
          searchTerm[i] = searchTerm[i].charAt(0).toUpperCase() + searchTerm[i].slice(1);
      }
      return searchTerm.join(' ');
  };

  var searchTerm = toTitleCase(searchTerm);
  // searchTerm = searchTerm.replace(" ", "+");
    
    var queryURL = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&origin=*&exintro=&titles=" + searchTerm;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(response) {
      var pageNum = Object.keys(response.query.pages)[0];
      var results = response.query.pages[pageNum].extract;
      $(".search-term").text(searchTerm);
      $(".wiki-description").html(results);
      console.log(results);
    }); //End ajax

  }); //End input-button click

}); //End $(document).ready