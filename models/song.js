var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SongSchema = new Schema({
  name: String,
  trackNumber: Number
});

var Song = mongoose.model('Song', SongSchema);

// exports Album schema to be accessible to all files with this express app
module.exports = Song;
