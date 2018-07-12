$(document).ready(function() {

  $(".search-button").click(function(){

    sessionStorage.clear();
    sessionStorage.setItem("count", 0);
    sessionStorage.setItem("leastPopularCount", 999999999999999)
    $(".wiki-description").html("");

    var infoUrl;
    var loopMax = 100;
    var apiKey = "f43c89c323b144e713989222d2dc1ac0&format=json";
    var baseUrl = "http://ws.audioscrobbler.com/2.0/?method="

    var searchTerm = $(".input-text").val();

    var queryURL = baseUrl + "artist.getsimilar&artist=" + searchTerm + "&api_key=" + apiKey;
    
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(response) {    
      for (var i = 0; i<loopMax; i++){
        infoUrl = baseUrl + "artist.getinfo&artist=" + response.similarartists.artist[i].name + "&api_key=" + apiKey;

        $.ajax({
          url: infoUrl,
          method: "GET",
        }).then(function(responseobject) {
          var x = sessionStorage.getItem("count");
          x++;
          sessionStorage.setItem("count", x);
          var playCount = responseobject.artist.stats.playcount;
              
          if (responseobject.error == "6"){console.log(responseobject.error);}
          else if ((playCount < sessionStorage.getItem("leastPopularCount")) & playCount > 100 ){
            sessionStorage.setItem("leastPopularCount" , responseobject.artist.stats.playcount);
            sessionStorage.setItem("leastPopularArtist", responseobject.artist.name);
            sessionStorage.setItem("leastPopularBio", responseobject.artist.bio.content); 
          }
            

          if (x == (loopMax - 1)){
            $(".search-term").text(sessionStorage.getItem("leastPopularArtist"));
            $(".wiki-description").html(sessionStorage.getItem("leastPopularBio"));
          }  

        }); // End inner ajax
      }// End for loop
    }); // End outer ajax
  }); //End input-button click
}); //End $(document).ready