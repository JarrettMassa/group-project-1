$(document).ready(function() {
    $(".search-button").on('click', function(){

    var searchTerm = $(".input-text").val();

    var toTitleCase = function (searchTerm) {
        searchTerm = searchTerm.toLowerCase().split(' ');
        for (var i = 0; i < searchTerm.length; i++) {
            searchTerm[i] = searchTerm[i].charAt(0).toUpperCase() + searchTerm[i].slice(1);
        }
        return searchTerm.join(' ');
    };

    var searchTerm = toTitleCase(searchTerm);
    // console.log(searchTerm);
    // searchTerm = searchTerm.replace(" ", "+");

    
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&maxResults=1&q=" + searchTerm + "&key=AIzaSyBIiK7587GW7yRbP8xNtzZOyE_mFULyl74";
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