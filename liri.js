// Connecting all the npm packages
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var axios = require("axios");
var fs = require("fs");
var chalk = require('chalk');

var spotify = new Spotify(keys.spotify);

// Define global variables
var fs = require("fs");
var command = process.argv[2];
var stuff = process.argv.slice(3).join("+");
var stuffPretty = process.argv.slice(3).join(" ");
var text;

function liriBot() {
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
  
    default:
      text =  `That is not a valid command. Please try again.`
      console.log(chalk.red("That is not a valid command. Please try again."));
      logRuns(text);
  }
}

function concertCommand() {
  if(!stuff) {
    text = `Unfortunately, you forgot to input a search item. Please try again.`
    console.log(chalk.red(text));

    logRuns(text);
  } else {
    axios.get("https://rest.bandsintown.com/artists/" + stuff + "/events?app_id=codingbootcamp").then(
      function (res) {
        if (res.data.length == 0) {
          text = `Unfortunately, ${stuff} has no planned events. Please try another band.`
          console.log(chalk.red(text));

          logRuns(text);
        } else {
          for (var i = 1; i < res.data.length; i++) {
            text = 
`------------------------
Results for ${stuffPretty}:
Event: ${i}
Venue Name: ${res.data[i].venue.name}
Venue Location: ${res.data[i].venue.city}, ${res.data[i].venue.country}
Date of Event: ${moment(res.data[i].datetime).format("MM/DD/YYYY")}
------------------------`
            console.log(chalk.blue(text));

            logRuns(text);
          }
        }
      }
    )
  }
}

function spotifyCommand() {
  // * If no song is provided then your program will default to "The Sign" by Ace of Base.
  if (!stuff) {
    spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      
      var defaultSong = data.tracks.items[9];
      text = 
`

You did not input a song to search. Checkout the song below instead!
Default Artist: ${defaultSong.artists[0].name}
Default Song Name: ${defaultSong.name}
Preview link: ${defaultSong.external_urls.spotify}
Album: ${defaultSong.album.name}

`
      console.log(chalk.red(text));

      logRuns(text);
    })
  } else {
    spotify.search({ type: 'track', query: stuff }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    
      var songInfo = data.tracks.items[0];
      var artistList = [];
      for (var x = 0; x < songInfo.artists.length; x++) {
        artistList.push(songInfo.artists[x].name);
      }
      text = 
`

Results for ${stuffPretty}:
Artist(s): ${artistList.join(", ")}
Song Name: ${songInfo.name}
Preview link: ${songInfo.external_urls.spotify}
Album: ${songInfo.album.name}

`
      console.log(chalk.green(text));

      logRuns(text);
    })
  }
}

function movieCommand() {
  if (!stuff) {
    axios.get("http://www.omdbapi.com/?apikey=trilogy&type=movie&t=Mr.+Nobody").then(
      function (res) {
      // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
      text = 
`------------------------
You did not input a movie to search. Checkout the movie below instead!
Movie: ${res.data.Title}
Year of release: ${res.data.Year}
Rating: ${res.data.Rated}
Rotten Tomatoes: ${res.data.Ratings[1].Value}
Country the movie was produced in: ${res.data.Country}
Language: ${res.data.Language}
Plot: ${res.data.Plot}
Actors: ${res.data.Actors}
------------------------`

        console.log(chalk.red(text));

        logRuns(text);
      }
    )
  } else {
    axios.get("http://www.omdbapi.com/?apikey=trilogy&type=movie&t=" + stuff).then(
      function (res) {
      text = 
`------------------------
Results for ${stuffPretty}:
Movie: ${res.data.Title}
Year of release: ${res.data.Year}
Rating: ${res.data.Rated}
Rotten Tomatoes: ${res.data.Ratings[1].Value}
Country the movie was produced in: ${res.data.Country}
Language: ${res.data.Language}
Plot: ${res.data.Plot}
Actors: ${res.data.Actors}
------------------------`

        console.log(chalk.yellow(text));

        logRuns(text);
      }
    )
  }
}

function doCommand() {
  fs.readFile("random.txt","utf8",function(err,data) {
    if (err) {
      return console.log(err);
    }
    var dataArr = data.split(",");
    var splitStuff = dataArr[1].split(" ").join("+");
    splitStuff = splitStuff.replace(/^"(.*)"$/, '$1');
    command = dataArr[0];
    stuff = splitStuff;

    liriBot();
  })
}

function logRuns(text) {
  fs.appendFile("log.txt", text, function(err){
    if (err) {
      return console.log(err);
    } 
    // else {
    //   console.log(chalk.magenta("log.txt was updated!"));
    // }
  });
}

liriBot();
