$(document).ready(function() {

  $(".search-button").click(function(){

    sessionStorage.clear();
    sessionStorage.setItem("count", 0);
    sessionStorage.setItem("leastPopularCount", 999999999999999)
    $(".wiki-description").html("");
    $(".comment-clerk").text("Hmmmmmm, let me think ...");

    var infoUrl;
    var loopMax = 100;
    var maxReplace = Math.floor(Math.random() * 5) + 1;
    var replaceCount = 0;
    var apiKey = "f43c89c323b144e713989222d2dc1ac0&format=json";
    var baseUrl = "https://ws.audioscrobbler.com/2.0/?method="

    var searchTerm = $(".input-text").val();
    $(".input-text").val("");

    searchTerm = toTitleCase(searchTerm);

    sessionStorage.setItem("searchTerm" , searchTerm);
    sessionStorage.setItem("replaceCount" , replaceCount);

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
          var y = sessionStorage.getItem("replaceCount");
          x++;
          sessionStorage.setItem("count", x);
          var playCount = responseobject.artist.stats.playcount;
              
          if (responseobject.error == "6"){}
          else if ((playCount < sessionStorage.getItem("leastPopularCount")) & playCount > loopMax & y < maxReplace){
            if (responseobject.artist.bio.content.includes("There are multiple artists with this name")){
            }
            else {
              sessionStorage.setItem("leastPopularCount" , responseobject.artist.stats.playcount);
              sessionStorage.setItem("leastPopularArtist", responseobject.artist.name);
              sessionStorage.setItem("leastPopularBio", responseobject.artist.bio.content);
              y++;
              sessionStorage.setItem("replaceCount", y); 
              console.log(responseobject.artist.name);
            }
          }       

          if (x == (loopMax - 1)){
            $(".search-term").text(sessionStorage.getItem("leastPopularArtist"));
            $(".wiki-description").html(sessionStorage.getItem("leastPopularBio"));
            
            loadYoutube(sessionStorage.getItem("leastPopularArtist"));
            var comment = newComment(sessionStorage.getItem("searchTerm"), sessionStorage.getItem("leastPopularArtist"));
            $(".comment-clerk").text(comment);
          }  

        }); // End inner ajax
      }// End for loop
    }); // End outer ajax
  }); //End input-button click


function loadYoutube(input){
    var searchTerm = input;
    debugger

    searchTerm += " official";

    var searchTerm = toTitleCase(searchTerm);
    
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&maxResults=1&q=" + searchTerm + "&key=AIzaSyBIiK7587GW7yRbP8xNtzZOyE_mFULyl74";
    debugger
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(data) {
    var newVideo = "https://www.youtube.com/embed/" + data.items[0].id.videoId;
    $(".embed-responsive-item").attr("src", newVideo);

  
    }); //End ajax
}

function newComment(searchBand, hipsterBand) {
    
    var comments = [
        "Ugh, xxxxxx? Seriously? What are you 6? Have you never bought a record before? Here buy this yyyyyy record instead then get the hell out of my store!",
        "xxxxxx is sooo like last decade. yyyyyy is the next big thing.",
        "LOL you still listen to xxxxxx??? yyyyyy can do exactly the same thing but like totally adapted to the modern era.",
        "Hmmm, we don't really have anything for xxxxxx because no one like listens to that anymore. yyyyyy is totally what you should try to get into now.",
        "Oh, yeah, I think we have xxxxxx records in the back by the grandma music. But yyyyyy records are on sale this week, you know, if you want to listen to GOOD music."
    ]

    var randomComment = '';
    randomComment = comments[Math.floor(Math.random() * comments.length)];
    randomComment = randomComment.replace("xxxxxx", searchBand).replace("yyyyyy", hipsterBand);

    if (searchBand == "Tenacious D"){
      randomComment = "Marry Me!";
    }

    $("comment-clerk").text(randomComment);

    return randomComment;
}

function toTitleCase(input){
  input = input.toLowerCase().split(' ');
  for (var i = 0; i < input.length; i++) {
    input[i] = input[i].charAt(0).toUpperCase() + input[i].slice(1);
  }
  return input.join(' ');
}

}); //End $(document).ready