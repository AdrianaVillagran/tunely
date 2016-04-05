/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


var allAlbums=[];
var template;
var thisOutsideTheFunction;

$(document).ready(function() {
  console.log('app.js loaded!');

//compiles handlebars template
  var source = $('#albums-template').html();
  template = Handlebars.compile(source);

//'get' call for album index data
  $.ajax ({
    method: 'GET',
    url: '/api/albums',
    success: handleAlbumSuccess,
  });


var $newAlbum = $('#album-form');

//submit new album
$newAlbum.on('submit', function(event) {
  event.preventDefault();
  var albumInput = $(this).serialize();
  console.log("post this query", albumInput);
  $.ajax({
    method: "POST",
    url: '/api/albums',
    data: albumInput,
    success: handleAlbumSuccess,
    error: createAlbumError,
  });

  $newAlbum[0].reset();
});

//event listener for opening song modal
$("#albums").on('click','.add-song', function(event) {
  // console.log('This add song button clicked!');
  var id= $(this).closest('.album').data('album-id');
  // console.log('id', id);
  $( "#songModal" ).attr( "data-album-id", id);
  $('#songModal').modal();
});

//event listener for adding songs
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

//delete album click event
$('#albums').on('click', '.delete-song', deleteAlbum);




});

//End of Document ready

//handles album success
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

//handles Deleted album success
function deleteAlbum(event){
  event.preventDefault();
  var albumId = $(this).closest('.album').data('album-id');
  //if data-album-id === deletedAlbum._id then remove()
  var dataTag = $('.album').attr('data-album-id');

  $('div[data-album-id=' + albumId+ ']').remove();
  //.remove();
  $.ajax ({
    method: 'DELETE',
    url: '/api/albums/' + albumId,
    success: function(json) {
      console.log("album successfully deleted");
    },
    error: function(err) {
      console.log("the album was not successfully deleted", err);
    }
  });
}

//
function createAlbumError(err) {
  console.log("there was an error creating an album", err);
}

//New Song Post
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
