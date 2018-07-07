$(document).ready(function() {
    $(".search-button").on('click', function(){

    var searchTerm = $(".input-text").val().trim();
    
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + searchTerm + "&key=AIzaSyBIiK7587GW7yRbP8xNtzZOyE_mFULyl74";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(data) {
    console.log(data.items[0].id.videoId);
    var newVideo = "https://www.youtube.com/embed/" + data.items[0].id.videoId;
    $(".embed-responsive-item").attr("src", newVideo);
    // debugger
    }); //End ajax

    });
});