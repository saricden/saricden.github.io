---
title: "Blow Things Up in Phaser 3"
tags: all javascript phaserjs
category: post
permalink: /phaser3-blow-things-up
layout: post
headerImg: "phaser3-blow-things-up.jpg"
# imgCredit: "Fahad Bin Kamal Anik via Unsplash"
# imgHref: "https://unsplash.com/photos/VwPUGLToNdI"
# youtubeURL: "https://www.youtube.com/embed/QOvW1sjMIL0"
---
In today's tutorial we're going to look at a method I use for creating an exploding sprite effect!

This is useful when, well, you need to blow things up! In my experience this happens a lot in game development.

First things first, you're going to need a few assets...

- A character to move around.
- An explosion animation.
- Something to detonate when the character collides with it.

If you don't have these things handy, here are some assets you can use:

Character:

<div class="res-img">
  <img src="/src/img/post_imgs/cat-like-creature.png" alt="Cat Like Creature" />
</div>

Explosion animation (frameWidth: 64, frameHeight: 64):

<div class="res-img">
  <img src="/src/img/post_imgs/kaboom.png" alt="Kaboom" />
</div>

Something to detonate (frameWidth: 32, frameHeight: 32):

<div class="res-img">
  <img src="/src/img/post_imgs/bomb.png" alt="Bomb" />
</div>

So first for our code, we'll want to preload our assets and create our animations in the `BootScene`:

```javascript
import {Scene} from 'phaser';

class BootScene extends Scene {
  constructor() {
    super("scene-boot");
  }
  
  preload() {
    this.load.image('cat-like', 'assets/cat-like-creature.png');
    this.load.spritesheet('bomb', 'assets/bomb.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('kaboom', 'assets/kaboom.png', {
      frameWidth: 64,
      frameHeight: 64
    });
  }

  create() {
    this.anims.create({
      key: 'bomb-idle',
      frames: this.anims.generateFrameNumbers('bomb', {
        start: 0,
        end: 3
      }),
      repeat: -1,
      frameRate: 14
    });

    this.anims.create({
      key: 'kaboom-boom',
      frames: this.anims.generateFrameNumbers('kaboom', {
        start: 0,
        end: 7
      }),
      repeat: 0,
      frameRate: 16
    });
    
    this.scene.start('scene-game');
  }
}

export default BootScene;
```

If you've worked with Phaser preloading and regular spritesheet animation before, this code will look pretty familiar to you.\

In the `preload()` function we're loading in an image, and two spritesheets for our character, explosion and bomb sprites.

In the `create()` function, we're creating two animations for the idle bomb, and the explosion.

Next is where things get interesting, we'll create our `GameScene`, wherein we'll implement the explosion detonation logic:

```javascript
import {Scene, Math as pMath} from 'phaser';

class GameScene extends Scene {
  constructor() {
    super("scene-game");
  }

  create() {
    // Pretty background colour
    this.cameras.main.setBackgroundColor(0x00FF55);

    // Add our character
    this.cat = this.physics.add.sprite(10, 10, 'cat-like');
    this.cat.setScale(0.5);
    this.catSpeed = 300;

    // Create our explosion sprite and hide it initially
    this.boom = this.physics.add.sprite(100, 100, 'kaboom');
    this.boom.setScale(3);
    this.boom.setVisible(false);

    // Set it to hide when the explosion finishes
    this.boom.on('animationcomplete', () => {
      this.boom.setVisible(false);
    })

    // Create a group for our bombs
    this.bombs = this.add.group();

    // Randomly position 10 bombs
    for (let i = 0; i <= 9; i++) {
      const rx = pMath.Between(100, window.innerWidth);
      const ry = pMath.Between(100, window.innerHeight);
      const bomb = this.physics.add.sprite(rx, ry, 'bomb');
      bomb.setScale(2);
      bomb.play('bomb-idle');

      // Create overlaps with our character and each bomb
      this.physics.add.overlap(this.cat, bomb, this.detonate, null, this);

      this.bombs.add(bomb);
    }

    // Set a toggle for when the a bomb has exploded
    this.exploded = false;

    // Create cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  // Our function to detonate a bomb on touch
  detonate(cat, bomb) {
    // Only detonate once
    if (!this.exploded) {
      // Get the x and y of the bomb we touched
      const {x, y} = bomb;

      // Hide the character and the bomb
      cat.setVisible(false);
      bomb.setVisible(false);
      
      // Position the explosion where the bomb was and play it
      this.boom.setPosition(x, y);
      this.boom.setVisible(true);
      this.boom.play('kaboom-boom');
    
      // Flip our toggle
      this.exploded = true;
    }
  }

  update() {
    const {left, right, up, down} = this.cursors;

    // Only allow movement if we haven't yet touched a bomb
    if (!this.exploded) {
      if (left.isDown) {
        this.cat.setVelocityX(-this.catSpeed);
      }
      else if (right.isDown) {
        this.cat.setVelocityX(this.catSpeed);
      }
      else {
        this.cat.setVelocityX(0);
      }
      if (up.isDown) {
        this.cat.setVelocityY(-this.catSpeed);
      }
      else if (down.isDown) {
        this.cat.setVelocityY(this.catSpeed);
      }
      else {
        this.cat.setVelocityY(0);
      }
    }
    // If we have, freeze our movement
    else {
      this.cat.setVelocity(0);
    }
  }

}
export default GameScene;
```

The method used her is pretty straightforward. We create a bunch of bomb instances on the screen, and add a `physics.overlap()` for each of them to detect hittests between bombs and our cat character. For more on hittests in Phaser 3, see <a href="/hittests-in-phaser3">this tutorial</a>.

When an overlap is detected, we hide the bomb and cat sprites, and show an explosion where the bomb was.

We play the explosion animation, and listen for when the animation is complete, then reset the visibility of the explosion to hidden.

So that's my method for blowing up sprites in Phaser. It can totally be improved upon, and if you have ideas on how to do that feel free to Tweet at me -- @saricden!

As always, happy hacking!

Love Kirk M. (@saricden)