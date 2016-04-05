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

  var source = $('#albums-template').html();
  template = Handlebars.compile(source);

  $.ajax ({
    method: 'GET',
    url: '/api/albums',
    success: handleAlbumSuccess,
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

$("#albums").on('click','.add-song', function(event) {
  // console.log('This add song button clicked!');
  var id= $(this).closest('.album').data('album-id');
  // console.log('id', id);
  $( "#songModal" ).attr( "data-album-id", id);
  $('#songModal').modal();
});

$('#saveSong').on('click', function(event) {
  event.preventDefault();
  console.log("new song submit works");

  var newTrackNumber = $('#trackNumber').val();
  var newSongName = $('#songName').val();

  var songInput = {
                    name: newSongName,
                    trackNumber: newTrackNumber
                  };
  console.log(songInput);
  var albumId = $('#songModal').attr('data-album-id');
  console.log('The album id is', albumId);

  $.ajax({
    method: "POST",
    url: '/api/albums/' + albumId + '/songs',
    data: songInput,
    success: handleNewSongSubmit,
    error: handleNewSongError
  });
});




});

function handleAlbumSuccess(albums) {
    albums.forEach(function(album) {
      renderAlbum(album);
    });
}

// this function takes a single album and renders it to the page
function renderAlbum(album) {

  var albumHtml = template(album);
  $('#albums').prepend(albumHtml);

}

function handleNewSongSubmit(json) {
  var albums = json;
  console.log(albums);
  console.log('The new song was successfully added to the album');
  $("#albums").empty();
  handleAlbumSuccess(albums);

  $('#songModal').modal('hide');
  $("#songName").val("");
  $("#trackNumber").val("");
}


function handleNewSongError(err) {
  console.log('whoops, there was an error on song submit', err);
}

function createAlbumError(err) {
  console.log("there was an error creating an album", err);
}
