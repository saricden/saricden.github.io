---
title: "Native Share with JavaScript"
tags: all javascript
category: post
permalink: /native-share-with-javascript
layout: post
headerImg: "george-pagan-iii-f-PH16nZHKI-unsplash.jpg"
imgCredit: "George Pagan III via Unsplash"
imgHref: "https://unsplash.com/photos/f-PH16nZHKI"
youtubeURL: "https://www.youtube.com/embed/Mt0enYWNJCU"
---
Hello again!

This tutorial is going to cover how to make a native share dialog, complete with a somewhat graceful fallback for browsers that don't yet support this feature.

Important note: as mentioned, we are going to cover browsers that don't support this feature, but this feature unfortunately doesn't have widespread support coverage. At the time of writing, it appears all major mobile browsers (iOS and Android) support it. That's good enough for me, but to get an up to date report of usage, check <a href="https://caniuse.com/#feat=web-share" target="_blank">Can I use</a>.

Now let's dive in!

**Step 1: Write Some Markup**

First up, we get to write some HTML. As with most of my functional tutorials, I'll be leaving the styling up to you.

```html
<button id="share-btn" data-url="https://yoursite/thispost" data-title="Post Title">Share Me!</button>
<div id="share-fallback">
  Share this link!
  <a href=".">https://yoursite.com/thispost</a>
</div>
```

Okay, a little CSS (just to hide the elements initially):

```css
#share-fallback,
#share-btn {
  display: none;
}
```

**Step 2: Feature Sniffing**

Next we're going to write a bit of JavaScript that will check the current browser for feature support, and display the appropriate element.

Add the following script to any JavaScript file being loaded at the end of your page's `<body>` tag.

```javascript
var shareBtn = document.getElementById('share-btn');
var shareFallback = document.getElementById('share-fallback');

if (shareBtn && shareFallback) {
  if (navigator.share) {
    // Supported, show the button
    shareBtn.style.display = "block";
    shareBtn.addEventListener('click', function() {
      navigator.share({
        title: shareBtn.getAttribute('data-title'),
        url: shareBtn.getAttribute('data-url')
      })
      .then(function() {
        console.log('Share success!');
      })
      .catch(console.error);
    });
  }
  else {
    // No bueno, show the link
    shareFallback.style.display = "block";
  }
}
```

And there we have it folks! You've succesfully implemented native share functionality into your project with a semi-graceful fallback for browsers that don't support it.

As always, happy hacking!

Love Kirk M. (@saricden)