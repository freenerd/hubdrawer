function log(message) {
  console.log(message);
}


// Detect a github page. I use this method instead of an URL check to support github enterprise
// instances.
function isGithubSite() {
  return window.location.hostname === 'github.com' || 
         $('meta[property="og:site_name"]').attr('content') === 'GitHub';
}

function injectDrawer() {
  $('#wrapper').append('<div>hallo du</div>');
}

function fetchTree(owner, repo, sha, callback) {
  url = "https://api.github.com/repos/" + owner + "/" + repo + "/git/trees/" + sha;
  results = $.getJSON(url, function(data) { callback(data) });
}

function displayContent(data) {
  console.log(data);
}

chrome.extension.onRequest.addListener(function(request, sender, callback) 
{
  if(isGithubSite()) {
    injectDrawer();
    fetchTree("freenerd", "soundcloud-map", "1acfc31ea1fffd81f34773d783ff8cf526cb4bf1", displayContent);
  }
});
