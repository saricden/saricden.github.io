---
title: "Jekyll Spotlight Search"
tags: all javascript jekyllrb
category: post
permalink: /jekyll-spotlight-search
layout: post
headerImg: "mick-haupt-eQ2Z9ay9Wws-unsplash.jpg"
imgCredit: "Mick Haupt via Unsplash"
imgHref: "https://unsplash.com/photos/eQ2Z9ay9Wws"
youtubeURL: "https://www.youtube.com/embed/m99f-U2xzcE"
---
In this tutorial, we'll be looking at how to setup a "spotlight search" using plain ol' JavaScript that integrates with a JekyllRB blog.

By *spotlight search*, I simply mean a search bar that as you type, results appear with each keystroke / change to the input.

This tutorial assumes you're familiar with the basics of JekyllRB, and JavaScript (we'll be using ES5 in this article to keep older browsers happy).

Let's get into it.

**Step 1: Create a JSON feed**

In order to have data for our search to read, we're going to be creating a JSON file that automatically updates as your Jekyll blog does.

Create a new file in the `_includes` directory, and name it `post-feed.html`. We're going to format this as JSON, then inject the text into a `<script>` tag that can be read on every page we want to show our search on.

{% raw %}
```liquid
[
  {% for post in site.tags.post %}
    {
      "title": "{{ post.title }}",
      "snippet": "{{ post.content | truncatewords: 25 | strip_html }}",
      "href": "{{ post.permalink }}"
    }{% if forloop.last == false %},{% endif %}
  {% endfor %}
]
```
{% endraw %}

Note these specifics pertain to my website, you'll likely want to modify the loop above such that it's iterating over the posts you want to display in your search.

**Step 2: Read your JSON into your JavaScript**

Next, we want to take our JSON object, output it somewhere in our HTML, then access it with our JavaScript.

To output the JSON I added the following to the bottom of my default layout:

{% raw %}
```html
<script type="application/json" id="search-data">{% include post-feed.html %}</script>
```
{% endraw %}

Then, in my JavaScript file, I load in the output JSON like so:

```javascript
var searchData = JSON.parse(document.getElementById('search-data').textContent);
```

**Step 3: Create Some Search Elements**

Now we're going to create the HTML elements that will house our search. The ones on my own site are a bit fancier, and this is certainly an area to get creative with, but for the sake of our tutorial we're going to keep ours pretty simple.

```html
<input type="search" id="search-bar" placeholder="Type here to search." />

<div id="search-results"></div>
```

You'll definitely want to style them up and make them pretty, but this is the skeleton of our search ready to go!

**Step 4: Write a Search Function**

You're almost there, keep going!

In this step, we'll put everything we have so far together into the function that powers our search.

```javascript
// First, parse the JSON we've thrown into the DOM
var searchData = JSON.parse(document.getElementById('search-data').textContent);

// Create a reference to our search results
var searchResultsList = document.getElementById('search-results');

// And one for our search input
var searchInput = document.getElementById('search-bar');

var updateSearchResults = function(e) {
  // Make the query case-insensitive
  var q = e.target.value.toLowerCase();

  // Make sure it isn't empty
  if (q.trim() !== '') {

    // Empty the search results DOM element
    searchResultsList.innerHTML = "";

    // Loop over all the items in our JSON blob
    for (let i in searchData) {
      var searchItem = searchData[i];

      // Check if the title or snippet includes our query string
      if (searchItem.title.toLowerCase().includes(q) || searchItem.snippet.toLowerCase().includes(q)) {

        // If it does, append a link to our results element
        var searchLink = document.createElement('a');
        var searchContent = document.createTextNode(searchItem.title);

        searchLink.setAttribute('href', searchItem.href);
        searchLink.appendChild(searchContent);
        searchResultsList.appendChild(searchLink);
      }
    }
  }
};

// Finally, bind our new function to the search input element
searchInput.addEventListener('keyup', updateSearchResults);
```

Now, it should be noted that *without a doubt*, there are more optimal solutions to this. But for the sake of simplicity, I'm going with this relatively straight-forward solution.

And with that, we should be done. Fire up your blog with `jekyll serve` if you haven't already, and take it for a spin!

As always, happy hacking!

Love Kirk M. (@saricden)