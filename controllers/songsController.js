/************
 * DATABASE *
 ************/

var db = require('../models');


// GET /api/albums
function index(req, res) {

}

function create(req, res) {
  console.log('hi post create is ready');

  var newSong = new db.Song({
    name: req.body.name,
    trackNumber:req.body.trackNumber
  });
  console.log(newSong);
  var albumId = req.params.album_id;
  console.log(albumId);
  db.Album.findById(albumId, function (err, foundAlbum) {
    if (err) {
      res.status(404).send('album not found');
    }
    foundAlbum.songs.push(newSong);
    foundAlbum.save(function (err, saved) {
      db.Album.find({}, function(err, albums) {
        res.json(albums);
      });
    });

});




}

function show(req, res) {


}

function destroy(req, res) {
  // FILL ME IN !
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
