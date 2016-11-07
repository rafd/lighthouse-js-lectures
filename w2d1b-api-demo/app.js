var getFromGithub = require('./get_from_github');

// NOTE: http requests are async
// the requests might not return in the order
// that we sent them

console.log("\nGET REPOS!")
getFromGithub('user/repos', function(repos) {
  console.log("\nREPOS:");
  console.log(repos.length);
});
console.log("\n-----");
console.log("\nGET GISTS!")
getFromGithub('gists', function(gists) {
  console.log("\nGISTS:");
  gists.forEach(function(gist) {
    console.log(gist.id);
  });
});

