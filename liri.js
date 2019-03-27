var fs = require("fs");
var command = process.argv[2];
var stuff = process.argv[3];
var keys = require("./keys.js");
require("dotenv").config();

var spotify = new Spotify(keys.spotify);

switch (command) {
  case "concert-this":
    concertCommand();
    break;
  
  case "spotify-this-song":
    spotifyCommand();
    break;
  
  case "movie-this":
    movieCommand();
    break;
  
  case "do-what-it-says":
    doCommand();
    break;
  }

  function concertCommand() {
    console.log("concert");
  }

  function spotifyCommand() {
    console.log("spotify");
  }

  function movieCommand() {
    console.log("movie");
  }

  function doCommand() {
    console.log("ddu du ddu du duu");
  }
