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
  $('#wrapper').append('<div>hallo du</div>')
}

chrome.extension.onRequest.addListener(function(request, sender, callback) 
{  
  if(isGithubSite()) {
    injectDrawer();
  }    
});
