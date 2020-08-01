---
title: "Jekyll Spotlight Search"
tags: all javascript jekyllrb
category: post
permalink: /jekyll-spotlight-search
layout: post
headerImg: "mick-haupt-eQ2Z9ay9Wws-unsplash.jpg"
imgCredit: "Mick Haupt via Unsplash"
imgHref: "https://unsplash.com/photos/eQ2Z9ay9Wws"
---
In this tutorial, we'll be looking at how to setup a "spotlight search" using plain ol' JavaScript that integrates with a JekyllRB blog.

By *spotlight search*, I simply mean a search bar that as you type, results appear with each keystroke / change to the input.

This tutorial assumes you're familiar with the basics of JekyllRB, and JavaScript (we'll be using ES5 in this article to keep older browsers happy).

Let's get into it.

**Step 1: Create a JSON feed**

In order to have data for our search to read, we're going to be creating a JSON file that automatically updates as your Jekyll blog does.

Create a new file in the `_includes` directory, and name it `post-feed.html`. We're going to format this as JSON, then inject the text into a `<script>` tag that can be read on every page we want to show our search on.

```liquid
{% raw %}
[
  {% for post in site.tags.post %}
    {
      "title": "{{ post.title }}",
      "snippet": "{{ post.content | truncatewords: 25 | strip_html }}"
    }{% if forloop.last == false %},{% endif %}
  {% endfor %}
]
{% endraw %}
```

Note these specifics pertain to my website, you'll likely want to modify the loop above such that it's iterating over the posts you want to display in your search.

**Step 2: Read your JSON into your JavaScript**

Next, we want to take our JSON object, output it somewhere in our HTML, then access it with our JavaScript.

To output the JSON I added the following to the bottom of my default layout:

```html
{% raw %}
<script type="application/json" id="search-data">{% include post-feed.html %}</script>
{% endraw %}
```

Then, in my JavaScript file, I load in the output JSON like so:

```javascript
var searchData = JSON.parse(document.getElementById('search-data').textContent);
```

**Step 3: 