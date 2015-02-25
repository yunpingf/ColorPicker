chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    id: "main",
    innerBounds: {
      width: 360,
      height: 450,
      minWidth: 360,
      minHeight: 450,
      maxWidth: 360,
      maxHeight: 450
    }
  });
});