// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
    bodyParser = require('body-parser');
    db = require('./models');
// generate a new express app and call it 'app'
var app = express();


// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

// We'll serve jQuery and bootstrap from a local bower cache avoiding CDNs
// We're placing these under /vendor to differentiate them from our own assets
app.use('/vendor', express.static(__dirname + '/bower_components'));

var controllers = require('./controllers');


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */


app.get('/api', controllers.api.index);

app.get('/api/albums', function(req,res) {
  db.Album.find(function (err, albums) {
    if(err) {
      console.log(err);
    }
    console.log(albums);
    res.json(albums);
  });
});

app.post('/api/albums', function(req,res) {
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
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
