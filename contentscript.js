function log(message) {
  console.log(message);
}


// Detect a GitHub page. We use this instead of an URL check to support GitHub enterprise instances.
function isGitHubSite() {
  return window.location.hostname === 'github.com' || 
         $('meta[property="og:site_name"]').attr('content') === 'GitHub';
}


// Returns `true` if the current page contains an GitHub repo.
function isGitHubRepository() {
  return $('meta[property="og:type"]').attr('content') === 'githubog:gitrepository';
}


// Performs `func` on the current GitHub repo
function withLoadedGitHubRepo(func, callback)
{
  if (isGitHubRepository()) {
    var permalink = $('link[rel="permalink"]').attr('href');
    permalink.replace(
        /^\/([-A-Za-z0-9_.]+)\/([-A-Za-z0-9_.]+)\/tree\/([a-z0-9]+)(\/.+){0,1}/
      , function(all, user, repo, hash, path) {
          func(user, repo, hash, path, callback);
      })
    }
}


function injectDrawer() {
  $('#wrapper').append('<div>hallo du</div>');
}


function fetchTree(owner, repo, sha, path, callback) {
  alert(owner);
  alert(repo);
  alert(sha);
  alert(path);
  url = "https://api.github.com/repos/" + owner + "/" + repo + "/git/trees/" + sha;
  results = $.getJSON(url, function(data) { callback(data) });
}

function displayContent(data) {
  console.log(data);
}

chrome.extension.onRequest.addListener(function(request, sender, callback) 
{
  if(isGitHubSite()) {
    injectDrawer();
    withLoadedGitHubRepo(fetchTree, displayContent);
  }
});
