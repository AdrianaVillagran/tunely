var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [String]
});

var Album = mongoose.model('Album', AlbumSchema);

// exports Album schema to be accessible to all files with this express app
module.exports = Album;
