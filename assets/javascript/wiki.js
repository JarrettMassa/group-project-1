$(document).ready(function() {

  $(".search-button").click(function(){

    var searchTerm = $(".input-text").val();
    
    var queryURL = "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&origin=*&exintro=&titles=" + searchTerm;

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