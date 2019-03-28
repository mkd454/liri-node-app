var fs = require("fs");
var command = process.argv[2];
var stuff = process.argv.slice(3).join("+");
var stuffPretty = process.argv.slice(3).join(" ");

// Connecting all the npm packages
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var axios = require("axios");

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
  console.log("Results for "+stuffPretty+":");
  axios.get("https://rest.bandsintown.com/artists/" + stuff + "/events?app_id=codingbootcamp").then(
    function (res) {
      if (res.data.length == 0) {
        console.log("Unfortunately, "+stuff+" has no planned events. Please try another band.");
      } else {
        for (var i = 1; i < res.data.length; i++) {
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

function spotifyCommand() {
  // * If no song is provided then your program will default to "The Sign" by Ace of Base.
  if (process.argv[3] === undefined) {
    console.log("You did not input a song to search. Checkout the song below instead!");
    spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      
      var defaultSong = data.tracks.items[9];
      // Find and use the right song and artist
      // for (var y =0; y < defaultSong.length; y++) {
      //   console.log(defaultSong[y].name);
      // }
      var defaultArtistList = [];
      for (var x = 0; x < defaultSong.artists.length; x++) {
        defaultArtistList.push(defaultSong.artists[x].name);
      }
      console.log("Default Artist: "+defaultArtistList.join(", ")); 
      console.log("Default Song Name: "+defaultSong.name); 
      console.log("Preview link: "+defaultSong.external_urls.spotify); 
      console.log("Album: "+defaultSong.album.name); 
    })
  } else {
    console.log("Results for "+stuffPretty+":");
    spotify.search({ type: 'track', query: stuff }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    
    var songInfo = data.tracks.items[0];
    var artistList = [];
    for (var x = 0; x < songInfo.artists.length; x++) {
      artistList.push(songInfo.artists[x].name);
    }
    console.log("Artist(s): "+artistList.join(", ")); 
    console.log("Song Name: "+songInfo.name); 
    console.log("Preview link: "+songInfo.external_urls.spotify); 
    console.log("Album: "+songInfo.album.name); 
    })
  }
}

function movieCommand() {
  if (process.argv[3] === undefined) {
    console.log("You did not input a movie to search. Checkout the movie below instead!");
    axios.get("http://www.omdbapi.com/?apikey=trilogy&type=movie&t=Mr.+Nobody").then(
      function (res) {
      // * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
      console.log("------------------------");
      console.log("Movie: "+res.data.Title);
      console.log("Year of release: "+res.data.Year);
      console.log("Rating: "+res.data.Rated);
      console.log("Rotten Tomatoes: "+res.data.Ratings[1].Value);
      console.log("Country the movie was produced in: "+res.data.Country);
      console.log("Language: "+res.data.Language);
      console.log("Plot: "+res.data.Plot);
      console.log("Actors: "+res.data.Actors);
      console.log("------------------------");
      }
    )
  } else {
    console.log("Results for "+stuffPretty+":");
    axios.get("http://www.omdbapi.com/?apikey=trilogy&type=movie&t=" + stuff).then(
      function (res) {
      // * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
      console.log("------------------------");
      console.log("Movie: "+res.data.Title);
      console.log("Year of release: "+res.data.Year);
      console.log("Rating: "+res.data.Rated);
      console.log("Rotten Tomatoes: "+res.data.Ratings[1].Value);
      console.log("Country the movie was produced in: "+res.data.Country);
      console.log("Language: "+res.data.Language);
      console.log("Plot: "+res.data.Plot);
      console.log("Actors: "+res.data.Actors);
      console.log("------------------------");
      }
    )
  }
}

function doCommand() {
  console.log("ddu du ddu du duu");
}
