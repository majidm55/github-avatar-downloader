var request = require('request');
var fs = require("fs");
var token = require("./secrets.js")


console.log("Welcome to the Github Avatar Downloader");

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
  url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  headers: {
    'User-Agent': 'request',
  }
};

  request(options, function(err, res, body) {
    var data = JSON.parse(body)
    cb(err, body);

    data.forEach(function(item) {
      console.log(item.avatar_url)
    });


  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});