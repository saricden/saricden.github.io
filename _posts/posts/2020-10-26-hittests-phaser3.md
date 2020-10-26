---
title: "Hittests in Phaser 3"
tags: all javascript phaserjs
category: post
permalink: /hittests-in-phaser3
layout: post
headerImg: "fahad-bin-kamal-anik-VwPUGLToNdI-unsplash.jpg"
imgCredit: "Fahad Bin Kamal Anik via Unsplash"
imgHref: "https://unsplash.com/photos/VwPUGLToNdI"
# youtubeURL: "https://www.youtube.com/embed/QOvW1sjMIL0"
---
Hittests are used to detect when two sprites collide with one another on the screen. They are integral to game development, and are an important tool for your aresenal.

In Phaser 3, a hittest is known as an `overlap`. In order to create one, we need two physics bodies that can touch. So let's get started.

This tutorial will assume you have <a href="/how-to-setup-phaser3-with-webpack4-and-babel">a modern Phaser development environment</a> set up as we will be using ES6 JavaScript, but if you don't, check out my tutorial on how to do so!

```javascript
import {Scene} from 'phaser';

class HittestScene extends Scene {
  constructor() {
    super('hittest-scene');
  }

  create() {
    this.cat = this.physics.add.sprite(100, 100, 'cat');
    this.dog = this.physics.add.sprite(400, 100, 'dog');
    this.statusText = this.add.text(10, 10, '[status]', {
      color: '#FFF',
      fontSize: 20,
      fontFamily: 'sans-serif'
    });

    this.hasTouched = false;

    // This is the line that adds our overlap
    this.physics.add.overlap(this.cat, this.dog, this.catDogTouch, null, this);
  }

  update() {
    const text = (this.hasTouched ? "Everytime we touch, I get this feeling!" : "Hasn't touched.");

    this.statusText.setText(text);
  }

  catDogTouch(cat, dog) {
    console.log(cat, dog);

    this.hasTouched = true;
  }
}

export default HittestScene;
```

And that's basically it. Let's break down the anatomy of that `overlap` function.

`overlap(obj1, obj2, collideCallback, processCallback, callbackContext)`

`obj1` = The game object to check collision for.

`obj2` = The game object to check collision with.

`collideCallback` = The function to invoke when the two objects touch.

`processCallback` = An optional function to add special conditions which determine if the objects are touching. Not needed in our simple case, so we pass in `null`.

`callbackContext` = The context in which the callbacks are triggered. In our case, we want it to be our scene, so we pass in `this`.

If you're interested in delving into further reading for the `overlap` function, see the <a href="https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Factory.html#overlap__anchor" target="_blank">Phaser documentation</a> on it.

If you enjoyed this tutorial, please share and/or comment below!

As always, happy hacking!

Love Kirk M. (@saricden)