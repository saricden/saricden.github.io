---
title: "How to Trim Whitespace in JavaScript"
tags: all javascript
category: post
permalink: /how-to-trim-whitespace-in-javascript
layout: post
headerImg: "romain-vignes-ywqa9IZB-dU-unsplash.jpg"
imgCredit: "Romain Vignes via Unsplash"
imgHref: "https://unsplash.com/photos/ywqa9IZB-dU"
# youtubeURL: "https://www.youtube.com/embed/QOvW1sjMIL0"
---
Today's micro-tutorial will cover a simple function built into JavaScript to trim whitespace in a string.

The function is called... Wait for it... `trim()`.

Whitespace is when you have additional spaces on the outer edges of your string. For example:

```javascript
const str1 = "       hello with whitespace       ";
const str2 = str1.trim();

console.log(str1);
console.log(str2);
```

The first console log will show first the original string with extra spaces on the left and right sides of the "hello with whitespace" message.

The second will show the same string, minus the whitespace.

Neat hey?

Trimming whitespace is useful for validating inputs. Generally speaking you don't want usernames to start or end with spaces.

And that's it for today's micro-tutorial. I hope you learned something. :)

As always, happy hacking!

Love Kirk M. (@saricden)