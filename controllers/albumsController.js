/************
 * DATABASE *
 ************/

var db = require('../models');


// GET /api/albums
function index(req, res) {
  db.Album.find(function (err, albums) {
    if(err) {
      console.log(err);
    }
    res.json(albums);
  });
}


function create(req, res) {
    var newAlbum = new db.Album({
      name: req.body.name,
      artistName: req.body.artistName,
      genres: req.body.genres,
      releaseDate:req.body.releaseDate
    });
    console.log("posting this new album", newAlbum);
    newAlbum.save(function(err, savedAlbum) {
      if(err) {
        console.log("there was an error creating album", savedAlbum);
      }
      res.json(savedAlbum);
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
