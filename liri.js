var fs = require("fs");
var command = process.argv[2];
var stuff = process.argv.slice(3).join("+");

// Connecting all the npm packages
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var axios = require("axios");

var spotify = new Spotify(keys.spotify);

switch (command) {
  case "concert-this":
    concertCommand(stuff);
    break;

  case "spotify-this-song":
    spotifyCommand(stuff);
    break;

  case "movie-this":
    movieCommand(stuff);
    break;

  case "do-what-it-says":
    doCommand(stuff);
    break;
}

function concertCommand(stuff) {
  axios.get("https://rest.bandsintown.com/artists/" + stuff + "/events?app_id=codingbootcamp").then(
    function (res) {
      if (res.data.length == 0) {
        console.log("Unfortunately, this band has no planned events. Please try another band.");
      } else {
        for (var i = 1; i < res.data.length + 1; i++) {
          console.log("Event: " + i);
          console.log("Venue Name: " + res.data[i].venue.name);
          console.log("Venue Location: " + res.data[i].venue.city + ", " + res.data[i].venue.country);
          console.log("Date of Event: " + moment(res.data[i].datetime).format("MM/DD/YYYY"));
          console.log("------------------------");
        }
      }
    }
  )
}

function spotifyCommand(stuff) {
  console.log("spotify");
}

function movieCommand(stuff) {
  console.log("movie");
}

function doCommand(stuff) {
  console.log("ddu du ddu du duu");
}
