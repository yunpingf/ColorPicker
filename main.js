chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    id: "main",
    innerBounds: {
      width: 400,
      height: 600
      /*minWidth: 400,
      minHeight: 600,
      maxWidth: 400,
      minWidth: 600*/
    }
  });
});