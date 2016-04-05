/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


var allAlbums=[];

$(document).ready(function() {
  console.log('app.js loaded!');

$.get('/api/albums').success(function (albums) {
    albums.forEach(function(album) {
      renderAlbum(album);
    });
  });


var $newAlbum = $('#album-form');

$newAlbum.on('submit', function(event) {
  event.preventDefault();
  var albumInput = $(this).serialize();
  console.log("post this query", albumInput);
  $.ajax({
    method: "POST",
    url: '/api/albums',
    data: albumInput,
    success: prependNewAlbum,
    error: createAlbumError,
  });

  $newAlbum[0].reset();
});




});

// this function takes a single album and renders it to the page
function renderAlbum(album) {
  var albumHtml = $('#albums-template').html();
  var albumsTemplate = Handlebars.compile(albumHtml);
  var html = albumsTemplate(album);
  $('#albums').prepend(html);
  $('ul').append(buildSongsHtml(album.songs));
}

function buildSongsHtml(songs) {
  var separator = "  &ndash; ";
  songs.forEach(function(song) {
     separator = separator + "(" + song.trackNumber + ") " + song.name + " &ndash; ";
  });
  var songsHtml  = "<li class='list-group-item'>" +
                     "<h4 class='inline-header'>Songs:</h4>" +
                       "<span>" + separator + "</span>" +
                   "</li>";
  return songsHtml;
}



function createAlbumError(err) {
  console.log("there was an error creating an album", err);
}
