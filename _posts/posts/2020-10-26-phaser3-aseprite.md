---
title: "Aseprite Sprites in Phaser 3.5"
tags: all javascript phaserjs
category: post
permalink: /aseprite-sprites-in-phaser3-5
layout: post
headerImg: "aseprite-phaser3-5.jpg"
# imgCredit: "Fahad Bin Kamal Anik via Unsplash"
# imgHref: "https://unsplash.com/photos/VwPUGLToNdI"
# youtubeURL: "https://www.youtube.com/embed/QOvW1sjMIL0"
---
Today we're going to cover how to use one of the newer features in Phaser 3.5 that I personally am very excited about: Aseprite Atlas Sprites!

Atlas Sprites take away the need to define each of your sprite's animations manually and let you focus instead on animating and coding game logic, letting Phaser take care of parsing all the individual animations.

If you're unfamiliar with Aseprite, <a href="https://www.aseprite.org/" target="_blank">check out their website here</a>. Aseprite is a popular program for drawing and animating spritesheets, and for good reason. It has many very useful features for drawing and animation such as a variety of drawing tools, onion skinning, layering, fine-tuned export settings, and animation tagging.

One other feature it has is the ability to export your spritesheets as optimized texture images, alongside a JSON Atlas file to allow game engines such as Phaser to interpret these images.

It is this feature we'll be using for this tutorial.

The first thing you'll need for this tutorial is a spritesheet in Aseprite (with a couple animations). If you haven't got one handy, feel free to <a href="/src/other/blob.aseprite">download mine here</a>.

The first thing you'll want to do to prepare your sprite is to *tag the animations*. In my example file, this is already done, but in order to do it on your own what you want to do is (for each individual animation):

<div class="res-img">
  <img src="/src/img/post_imgs/selected-frames.png" alt="Selected frames" />
</div>

Select the frames you want included in the animation.

<div class="res-img">
  <img src="/src/img/post_imgs/aseprite-right-click.png" alt="Right click on the frame numbers" />
</div>

Right click on the frame numbers, then click *"New Tag"*.

<div class="res-img">
  <img src="/src/img/post_imgs/tag-window.png" alt="Tag window">
</div>

Fill out the name of your selected animation and click Ok.

Once you've tagged all your sprite's animation names appropriately, you're ready to move on to the next step: export settings.

Make sure you've saved your `.aseprite` file somewhere, then click File &gt; Export Sprite Sheet. Fill out the export settings as follows:

<div class="res-img">
  <img src="/src/img/post_imgs/export-settings.png" alt="Export settings" />
</div>

Make sure you set the following settings:

**Borders**
1. Check Trim Sprite
2. Check Trim Cels

**Output**
1. Check Output File (set path to your game's asset directory)
2. Check JSON Data (set path to the same directory as the image)
3. Select Array Meta
4. Uncheck Layers and Slices, but leave Tags checked
5. Set the Item Filename to *"{frame}"* only (**important!**)

After you've set those settings, hit Export!

Now that we have our asset files exported, we can move on to writing our code to load and utilize these assets!

Code part 1 - Boot scene loading:

```javascript
import {Scene} from 'phaser';

class BootScene extends Scene {
  constructor() {
    super('scene-boot');
  }

  preload() {
    this.load.atlas('blob', 'assets/blob.png', 'assets/blob.json');
  }

  create() {
    this.anims.createFromAseprite('blob');

    this.scene.start('scene-game');
  }
}

export default BootScene;
```

In the above code we load our Aseprite atlas and texture files using the `preload()`'s `this.load.atlas()` function, then in the scene's `create()` function, we parse the Aseprite animation tags using `this.anims.createFromAseprite()`.

Code part 2 - Playing animations:

```javascript
import {Scene} from 'phaser';

class GameScene extends Scene {
  constructor() {
    super('scene-game');
  }

  create() {
    this.blob = this.add.sprite(100, 100, 'blob');

    this.blob.play({ key: 'down', repeat: -1 });
  }
}

export default GameScene;
```

The second and final chunk of code for our tutorial is fairly straightforward. It creates an instance of our blob sprite on the screen using `this.add.sprite()` factory, then plays the blob's 'down' animation via `this.blob.play()`.

And that's about it for Aseprite animation parsing with Phaser 3.5, thank you for reading!

And as always, happy hacking!

Love, Kirk M. (@saricden)