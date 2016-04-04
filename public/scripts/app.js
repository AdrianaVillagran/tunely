/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


var allAlbums=[];
var template;

$(document).ready(function() {
  console.log('app.js loaded!');

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: renderAlbums,
    error: function handleError(err) {
      if(err) {
        console.log(err);
      }
    }
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



  var source = $('#albums-template').html();
  template = Handlebars.compile(source);


});

// this function takes a single album and renders it to the page
function renderAlbums(json) {
  allAlbums = json;
  allAlbums.forEach(function (album) {
    prependNewAlbum(album);
  });
}

function prependNewAlbum(album) {
  var renderedHTML = template({album: album});
  $('#albums').prepend(renderedHTML);
}



function createAlbumError(err) {
  console.log("there was an error creating an album", err);
}
