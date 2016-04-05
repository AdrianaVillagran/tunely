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
    success: renderAlbum,
    error: createAlbumError,
  });

  $newAlbum[0].reset();
});




});

// this function takes a single album and renders it to the page
function renderAlbum(album) {
  var source = $('#albums-template').html();
  var template = Handlebars.compile(source);
  var albumHtml = template(album);
  $('#albums').prepend(albumHtml);
}





function createAlbumError(err) {
  console.log("there was an error creating an album", err);
}
