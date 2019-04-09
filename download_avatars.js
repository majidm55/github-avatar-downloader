var request = require('request');
var fs = require("fs");
var token = require("./secrets.js")


console.log("Welcome to the Github Avatar Downloader");

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
  url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  headers: {
    'User-Agent': 'request'
  }
};

   function downloadImageByURL(url, filePath) {
   request.get(url)
     .on("error", function (err) {
     throw err;
   })
   .pipe(fs.createWriteStream(filePath));

 }

  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    cb(err, data);

    data.forEach(function(item) {
    downloadImageByURL(item.avatar_url, 'avatar/' + item.login + '.jpg');
    console.log(item.avatar_url);
  });
});

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
});