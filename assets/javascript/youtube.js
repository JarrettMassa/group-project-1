function youtubeApiCall(){
  $.ajax({
      cache: false,
      data: $.extend({
          key: 'AIzaSyBIiK7587GW7yRbP8xNtzZOyE_mFULyl74',
          q: $('#search').val(),
          part: 'snippet'
      }, {maxResults:20,pageToken:$("#pageToken").val()}),
      dataType: 'json',
      type: 'GET',
      timeout: 5000,
      url: 'https://www.googleapis.com/youtube/v3/search'
  })
};