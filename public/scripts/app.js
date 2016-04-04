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


  var source = $('#albums-template').html();
  template = Handlebars.compile(source);


});

// this function takes a single album and renders it to the page
function renderAlbums(json) {
  allAlbums = json;
  allAlbums.forEach(function (album) {
    var renderedHTML = template({album: album});
    $('#albums').append(renderedHTML);
  });

}
