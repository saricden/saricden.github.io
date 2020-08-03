---
title: "How to Use Switch Statements in JavaScript"
tags: all javascript
category: post
permalink: /how-to-use-switch-statements-in-javascript
layout: post
headerImg: "taylor-vick-M5tzZtFCOfs-unsplash.jpg"
imgCredit: "Taylor Vick via Unsplash"
imgHref: "https://unsplash.com/photos/M5tzZtFCOfs"
# youtubeURL: "https://www.youtube.com/embed/Mt0enYWNJCU"
---
Hello there! Today we're going to be discussing how `switch` statements work in JavaScript. When you would use them, and why.

The `switch` statement is a control structure built into JavaScript (along with many other languages). It allows you to check the value of a variable, and perform different actions based on that variables value. If you're already familiar with JavaScript you are probably thinking "cool, but can't I do that with an `if` statement to?"

You're not wrong.

The following code snippets show two different ways to accomplish the same thing:

```javascript
var foo = "bar";

if (foo === "bar") {
  console.log('Foo is bar.');
}
else {
  console.log('Bar is foo.');
}
```

```javascript
var foo = "bar";

switch(foo) {
  case 'bar':
    console.log('Foo is bar.');
  break;

  default:
    console.log('Bar is foo.');
  break;
}
```

Both pieces of code will output the same thing. So why use a `switch` over an `if`?

The main reasons I use `switch` statements when I can is because I think `switch` statements read a lot cleaner. There can also be performance gains in certain circumstances with `switch` statements.

**The Syntax of Switch Statements**

The main keywords to use when implementing a `switch` statement are `switch`, `case`, `default`, and `break`.

`switch` is used when you pass in the variable to perform the statement on.

`case` is used to check if the variable is equal to a given value.

`default` is used much like an `else` statement in an `if` block. It will be evaluated as true if your variable doesn't match any of the provided `case` statements.

`break` is used to define the end of a block of code performed if a `case` or `default` is evaluated as true.

And that about sums it up. I hope this post gave you a little bit of insight into how `switch` statements work.

Love Kirk M. (@saricden)