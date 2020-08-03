---
title: "Responsive Modals in JavaScript & CSS"
tags: all javascript css
category: post
permalink: /custom-modals-in-javascript-and-css
layout: post
headerImg: "irvan-smith-5eBW5GomfhY-unsplash.jpg"
imgCredit: "Irvan Smith via Unsplash"
imgHref: "https://unsplash.com/photos/5eBW5GomfhY"
# youtubeURL: "https://www.youtube.com/embed/Mt0enYWNJCU"
---
Today we're going to learn how to create custom modals for our web projects. Modals are an excellent tool for your UI/UX toolkit.

**Step 1: Build out your Markup**

To start, let's write out some HTML.

```html
<button data-openmodal="cool-modal1">Click Me!</button>

<div data-modal="cool-modal1">
  <div>
    <header>
      <span>Cool Modal 1!</span>
      <button>Close</button>
    </header>
    <p>
      Hello from our modal!
    </p>
  </div>
</div>
```

Pretty slick right? The `data-openmodal` attribute is going to be used to specify which modal to open when that element is clicked. The `data-modal` attribute is a unique identifier for our modal.

**Step 2: Style Style Style**

Normally in my tutorials, I focus on function over form. In this one however, I'm going to give you some CSS to make your modal look pretty as well as work.

```css
:root {
  font-size: 10px;
  font-family: sans-serif;
}

body.noscroll {
  overflow-y: hidden;
}

[data-modal] {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: scroll;
  
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s, visibility 0.5s;
}

[data-modal].open {
  opacity: 1;
  visibility: visible;
}

[data-modal] > div {
  width: 100%;
  max-width: 50rem;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  background-color: #FFF;

  transform: scale(0);
  transition: transform 0.5s;
}

[data-modal].open > div {
  transform: scale(1);
}

[data-modal] > div header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

[data-modal] > div header button {
  font-size: 1.25rem;
  color: blue;
  border: 0;
  background-color: transparent;
  outline: none;
}

[data-modal] > div header span {
  font-size: 2.5rem;
}

[data-modal] > div p {
  font-size: 1.8rem;
}
```

The important takeaways of the above code are:

*We're adding a class to the `<body>` that we will later use to disable scrolling on the page.*

*We're setting the modal wrapper to `postition: fixed` so that it "sticks" to the screen, no matter where the user has scrolled. We're also setting `overflow-y: scroll` so that if the modal has a lot of content and spills off-screen (particularly on mobile devices), the user will be able to scroll the modal.*

*We're adding `transition` properties to animate the modal opening and closing. These fallback gracefully on old browsers.*

And

*We're toggling the `visibility` and `opacity` properties on the wrapping `<div>` so that it will be hidden when the modal is closed, but won't prevent the user from clicking other elements on the page.*

Now, onwards!

**Step 3: A Dab of JavaScript Magic**

This is where the rubber meets the pavement, so to speak. We're now going to write the script that will be responsible for selecting the correct elements and binding events to them that toggle classes and trigger our transitions specified above.

```javascript
// Grab our trigger buttons (or links or whatever you apply the class to)
var modalBtns = document.querySelectorAll('[data-openmodal]');

// Grab our divs designated as modals
var modals = document.querySelectorAll('[data-modal]');

console.log(modalBtns);

// Loop through our buttons
for (var b in modalBtns) {
  // Make sure we're looking at a DOM element
  if (modalBtns[b] instanceof Element || modalBtns[b] instanceof HTMLDocument) {
    // Bind click events to each of them
    modalBtns[b].addEventListener('click', function(e) {
      // Prevent the default operation (opening a link for example)
      e.preventDefault();

      // When clicked, read the modal it's referencing
      var targetModalName = e.target.getAttribute('data-openmodal');
      
      // Fetch the element it's referring to
      var targetModal = document.querySelector('[data-modal="'+targetModalName+'"]');

      // Add the open class to that modal
      targetModal.classList.add('open');

      // Disable scrolling on the body
      document.body.classList.add('noscroll');
    });
  }
}

// Loop through our modals
for (var m in modals) {
  // Make sure we're looking at a DOM element
  if (modals[m] instanceof Element || modals[m] instanceof HTMLDocument) {
    // Bind click events to each modal's close button
    modals[m].querySelector('header button').addEventListener('click', function(e) {
      // Remove the open class from the parent container
      e.target.parentNode.parentNode.parentNode.classList.remove('open');

      // Re-enable scrolling on the body
      document.body.classList.remove('noscroll');
    });
  }
}
```

And there ye have it. Throw all this together on a page and you should have a working, fully pretty modal to play with.

A neat aside about the process above is that once the JavaScript and CSS are implemented, you can reuse the `data-openmodal` and `data-modal` attributes to make as many modals as you'd like on the page. They will automatically have the correct events and styles applied.

Thanks for reading my post, if you found any of this useful, please consider sharing with a friend or collegue.

As always, happy hacking!

Love Kirk M. (@saricden)