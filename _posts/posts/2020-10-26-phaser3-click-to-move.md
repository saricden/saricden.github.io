---
title: "Click to Move in Phaser 3"
tags: all javascript phaserjs
category: post
permalink: /phaser3-click-to-move
layout: post
headerImg: "phaser3-click-to-move.jpg"
# imgCredit: "Fahad Bin Kamal Anik via Unsplash"
# imgHref: "https://unsplash.com/photos/VwPUGLToNdI"
# youtubeURL: "https://www.youtube.com/embed/QOvW1sjMIL0"
---
In this post, we're going to look at implementing a "click-to-move" style control scheme, as seen in games such as RuneScape and Diablo.

This control setup is particularly useful for games that require cross-platform support. In other words games that work on mobile as well as they do on desktop.

This tutorial assumes you have <a href="/how-to-setup-phaser3-with-webpack4-and-babel">a modern development environment</a> setup for Phaser 3. If you don't, follow the link to read my tutorial on how to do so!

After setting up your project, preload in a couple assets. For my example I use the following:

1. A cat to act as our player
2. A bouncing arrow to indicate where we're going

After preloading your assets, head over to your main game scene (in my case `GameScene`). Below is the code I used:

```javascript
import {Scene, Math as pMath} from 'phaser';
const {Vector2} = pMath;

class GameScene extends Scene {
  constructor() {
    super("scene-game");
  }

  create() {
    // Set a nice background colour
    this.cameras.main.setBackgroundColor(0x3399FF);

    // Add and adjust our sprite
    this.cat = this.physics.add.sprite(10, 10, 'cat-like');
    this.cat.body.setAllowGravity(false);
    this.cat.setScale(0.5);

    // Adding an arrow is optional, but a nice touch
    this.arrow = this.physics.add.sprite(0, 0, 'arrow');
    this.arrow.body.setAllowGravity(false);
    this.arrow.setVisible(false);
    this.arrow.setScale(2);
    this.arrow.play({ key: 'arrow-osc', repeat: -1 });

    // Initialize our target position as a 2D vector
    this.target = new Vector2();
    
    // When the user releases the screen...
    this.input.on('pointerup', (pointer) => {
      // Get the WORLD x and y position of the pointer
      const {worldX, worldY} = pointer;
      
      // Assign the world x and y to our vector
      this.target.x = worldX;
      this.target.y = worldY;

      // Position the arrow at our world x and y
      this.arrow.body.reset(worldX, worldY);
      this.arrow.setVisible(true);

      // Start moving our cat towards the target
      this.physics.moveToObject(this.cat, this.target, 200);
    });
  }

  update() {
    // If the cat is moving...
    if (this.cat.body.speed > 0) {
      // Calculate it's distance to the target
      const d = pMath.Distance.Between(this.cat.x, this.cat.y, this.target.x, this.target.y);
      
      // If it's close enough,
      if (d < 4) {
        // Reset it's body so it stops, hide our arrow
        this.cat.body.reset(this.target.x, this.target.y);
        this.arrow.setVisible(false);
      }
    }
  }

}

export default GameScene;
```

The important components to take note of in this example are:

1. The `this.physics.moveToObject()` call
2. The distance calculation between the cat and the target
3. The `this.cat.body.reset()` call

**`this.physics.moveToObject(this.cat, this.target, 200)`**

This is used to set the cat's velocity. In our case we're passing in three parameters: the game object we want to move, followed by the target object we're moving to, followed by the speed at which we want our cat to move.

**`pMath.Distance.Between(this.cat.x, this.cat.y, this.target.x, this.target.y)`**

In this case, `pMath` is simply a reference to `Phaser.Math`. The `Distance.Between()` function accepts four arguments: the first position's x and y, and the second position's x and y, and returns the distance between the two. Later in our code we check to see if the distance is less than 4, so we can detect when the cat is close enough to our target. Which leads me to our next important function:

**`this.cat.body.reset(this.target.x, this.target.y)`**

This function halts the object at the given x and y. So in our case, when the distance comes within an acceptable range (4), the cat's position will be set to the target's x and y, and any acceleration or velocity will be removed.

I hope this tutorial was helpful to you! If you make a game using any of the techniques discussed in my articles, feel free to Tweet it at me on Twitter (@saricden).

As always, happy hacking!

Love Kirk M. (@saricden)