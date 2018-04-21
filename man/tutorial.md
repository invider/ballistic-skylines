
# Collider.JAM

***Welcome to the World of Game Jamming!***

This tutorial provides you with necessary information to get you started.

**collider.jam** is a game framework for rapid game prototyping. It is crafted
to provide fast tools for game prototyping from scratch and fast develop/test
cycles.

The core principle is that everything on the scene is represented by a single tree.
All game state is on that tree and you can change it by modifying the tree.
All nodes are available as a JavaScript object hierarchy.

Also, the tree is mirrored by the filesystem folder **/pub** on the web server.
So you can create new nodes and add new code and resources just simply by adding new files at appropriate folders.

How it works? As follows:

* add _hero.js_ at _/pub/mod/lab/_ to define a hero actor.
* add _monster.js_ at _/pub/mod/dna/_ to define a prototype for a monster to spawn.
* add _background.png_ at _/pub/mod/res/_ to automatically load background image.
_and so on..._


<div style="page-break-after: always;"></div>
# Hello

Following steps needs to be completed before you begin:

* Install node.js
* Download and unpack collider.jam distribution
* start collider.jam server by running ./srv script in the top folder

Top folder defines a node.js http server that serves static content from
/pub folder. This folder contains client parts of game framework
and all components of your game.

To show something, we need to create a **prop**.

The **prop** has draw() function that shows it every cycle.
But no specified behavior.

```
<html> <body>
  <script src='jam/fix.js'></script>
  <script>
      // declare an entity in the lab
      this['@lab/hello'] = {

          // this function draws the entity
          draw: function() {
              let ctx = this._.ctx

              // fill background
              ctx.fillStyle = "#220044"
              ctx.fillRect(0, 0, ctx.width, ctx.height)

              // show text
              ctx.fillStyle = "#FFFF00"
              ctx.font="32px Impact";
              ctx.textAlign = "center"
              ctx.fillText('Hello JAM!', ctx.width/2, ctx.height/2)
          }
      }
  </script>
</body> </html>
```

<div style="page-break-after: always;"></div>
# Motion

Let us add some motion.
**evo(delta)** function runs each cycle and is responsible for updating actor state.
It accepts time in seconds passed since the last cycle.
```
<html> <body>
    <script src="jam/fix.js"></script>
    <script>
      // declare a dot actor
      this['@lab/dot'] = {
          // state
          dt: 0,
          // evolve
          evo: function(delta) {
              // init x and y if necessary
              if (!this.x
                    || this.x < 0
                    || this.x > scene.env.width
                    || this.y < 0 || this.y > scene.env.height) {
                  this.x = this._.env.width/2
                  this.y = this._.env.height/2
              }
              if (this.dt <= 0) {
                  // new time and direction
                  this.dt = 1 + Math.random() * 3
                  this.dx = (50 + Math.random() * 40) * (Math.random() - 0.5)
                  this.dy = (50 + Math.random() * 40) * (Math.random() - 0.5)
              }
              // move point and delta time
              this.x += this.dx * delta
              this.y += this.dy * delta
              this.dt -= delta
          },
          // show the dot
          draw: function() {
              let ctx = this._.ctx
              // clear the screen
              ctx.fillStyle = "#220044"
              ctx.fillRect(0, 0, canvas.width, canvas.height)
              // draw dot
              ctx.fillStyle="#FF0000";
              ctx.fillRect(this.x, this.y, 3, 3);
          }
      }
    </script>
</body> </html>
```

<div style="page-break-after: always;"></div>
# Topology

The whole game state is represented by a single hierarchical tree.
It resembles the filesystem and actually are mirrored by static content in /pub.

You can just include new files in mod at appropriate places
and they are going to be loaded automatically with mod.
Only /fix folders are not loaded automatically and have to be loaded manually.

**/setup** - functions executed to setup the game before the main cycle

**/sys** - system functions - these are copied to all sub-mods

**/lib** - library functions with no state associated

**/res** - folder for resources (images, sfx, music etc)

**/dna** - folder for prototypes (to spawn into /lab)

**/env** - configuration variables to setup game environment

**/lab** - folder for all currently active props, ghosts and actors

**/mod** - frame to contain all child nodes

**/trap** - functions to catch events (like from mouse and keyboard)

**/log** - logging functions


Check out mod folder examples in /pub to see possible ways to organize code and resources.


<div style="page-break-after: always;"></div>
# Glossary

**prop** - a node in /lab with specified visuals (**draw()** function) but no behavior in **evo(dt)**

**ghost** - a node in /lab with specified behavior in **evo(dt)** but no visuals

**actor** - a node in /lab with visuals and behavior (need to define both **draw()** and **evo(dt)**)

**scene** - main mod that includes all others and represents the root for the game scene tree.

**mod** - a layer with specified structure for prototypes, actors, library functions etc...

**fix** - a patch to the existing mod tree. Can be used to extend existing nodes with additional content and funcionality.

**node** - any js object on the scene.

**frame** - a specific group node that works as a folder for other nodes.
