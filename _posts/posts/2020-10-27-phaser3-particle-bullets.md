---
title: "Particle Emitter as Bullets in Phaser 3"
tags: all javascript phaserjs
category: post
permalink: /particle-emitter-as-bullets-in-phaser3
layout: post
headerImg: "phaser3-bullet-emitter.jpg"
# imgCredit: "Fahad Bin Kamal Anik via Unsplash"
# imgHref: "https://unsplash.com/photos/VwPUGLToNdI"
# youtubeURL: "https://www.youtube.com/embed/QOvW1sjMIL0"
---
Bullets are essential in many genres of games. Phaser has a super useful system that we can use for this known as particle emitters.

Particle emitters can be used for a variety of use cases, from explosions, to contrail, but for this tutorial we'll be using them to create bullets.

Here are some assets you can use for this tutorial:

The famous cat like creature.

<div class="res-img">
  <img src="/src/img/post_imgs/cat-like-creature.png" alt="Cat Like Creature" />
</div>

A cannon.

<div class="res-img">
  <img src="/src/img/post_imgs/cannon.png" alt="Cannon" />
</div>

A bullet particle (it's just a pixel, so you might not see it).

<div class="res-img">
  <img src="/src/img/post_imgs/bullet.png" alt="Cat Like Creature" />
</div>

So first, in our `BootScene` we need to import all our assets:

```javascript
import {Scene} from 'phaser';

class BootScene extends Scene {
  constructor() {
    super("scene-boot");
  }
  
  preload() {
    // Load all our images
    this.load.image('cat-like', 'assets/cat-like-creature.png');
    this.load.image('cannon', 'assets/cannon.png');
    this.load.image('bullet', 'assets/bullet.png');
  }

  create() {
    this.scene.start('scene-game');
  }
}

export default BootScene;
```

Next, we want to get into the meat of our particle shooter mechanic:

```javascript
import {Scene, Math as pMath} from 'phaser';

class GameScene extends Scene {
  constructor() {
    super("scene-game");
  }

  create() {
    // Pretty background colour
    this.cameras.main.setBackgroundColor(0x221111);
    
    // Add scale, and z-index our cannon
    this.cannon = this.physics.add.sprite(
      (window.innerWidth / 2),
      (window.innerHeight - 100),
      'cannon'
    );
    this.cannon.setScale(3);
    this.cannon.setDepth(2);

    // Create a "collider" object which we will use with out bullet emitter
    const catCollider = {
      contains: (x, y) => {
        // Initially our x/y won't hit our cats
        let hit = false;

        // Loop over all the cats in our group (defined below)
        this.cats.children.entries.forEach((cat) => {
          // For each cat, if our particle's x/y is inside the cat's body (and the cat isn't invisible)
          if (cat.body.hitTest(x, y) && cat.alpha > 0) {
            // Switch hit to true (killing the particle)
            hit = true;
            // Reduce the cat's alpha
            cat.alpha -= 0.05;
          }
        })

        return hit;
      }
    };

    // Create our particle object, and set it's z-index
    this.bullets = this.add.particles('bullet');
    this.bullets.setDepth(1);

    // Use the particle object to create an emitter
    this.bulletEmitter = this.bullets.createEmitter({
      x: (window.innerWidth / 2),
      y: (window.innerHeight - 100),
      speed: 700,
      scale: 5,
      quantity: 1,
      lifespan: 2000,
      on: false,
      angle: 0,
      frequency: 100,
      // Apply our collider object (defined earlier)
      deathZone: {
        type: 'onEnter',
        source: catCollider
      }
    });

    // Create a group to contain our cats
    this.cats = this.add.group();

    // Randomly position 10 cat sprites
    for (let i = 0; i <= 9; i++) {
      const xr = pMath.Between(0, window.innerWidth);
      const xy = pMath.Between(0, window.innerHeight - 200);
      const cat = this.physics.add.sprite(xr, xy, 'cat-like');
      cat.setScale(0.5);

      this.cats.add(cat);
    }

    // On mouse/touch press, start our bullet emitter
    this.input.on('pointerdown', (pointer) => {
      this.bulletEmitter.start();
    });

    // On mouse/touch release, stop the emitter
    this.input.on('pointerup', (pointer) => {
      this.bulletEmitter.stop();
    });

    // On mouse/touch move, rotate both the cannon and emitter
    this.input.on('pointermove', (pointer) => {
      const {worldX, worldY} = pointer;
      const angle = pMath.Angle.Between(this.cannon.x, this.cannon.y, worldX, worldY);
      const angleDeg = angle * 180 / Math.PI;

      this.cannon.setRotation(angle + (Math.PI / 2));
      this.bulletEmitter.setAngle(angleDeg);
    });
  }

}
export default GameScene;
```

Important takeaways from the above code are as follows:

- Note the emitter config and deathZone collider
- Note the pointer events which control the emitter

And that about wraps things up! Thank you for reading as always, if you want me to elaborate on anything or notice any errors, feel free to Tweet me or comment on this post.

Happy hacking!

Love Kirk M. (@saricden)