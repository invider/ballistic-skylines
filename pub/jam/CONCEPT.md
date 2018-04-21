=== Collider.jam ===
====================


What is Collider.jam
====================

The goal is to have a simple rapid game prototyping framework
that can easily be learned by newly formed teams on jams.

* sys
* res
    * img (png, jpeg)
    * snd (wav, ogg, mp3)
    * dat (txt, json, yaml, csv, pwd, props, xml?...)
* lib - utilities
* dna - hibernated clonable actors, ghosts and props
* env - static data, settings and tuning
* lab
    * group
        * state (layer)
    * actor
    * ghost
    * prop
* job - regular jobs
* cue - triggers on conditions
* cmd - console commands
* log - log functions and history
* ext - all external objects and plugins that can't be placed anywhere else
* man - manual data and functions

/mod structure
    * /root
    * .. (parent)
    * bin - scene tree manipulation functions
    * lib - utility functions (functions only + help)
    * res - mod resources (img, fnt, sfx, music, data etc), no actions associated
    * dna - constructors and prototypes
    * env - globally used data (no functions)
    * lab - actors, ghosts and props entities. lab+env determines game state, lab nodes are central target for game loop
    * cue - conditional triggers
    * job - timed and regular jobs
    * cmd - mod console commands
    * log - log functions and history when tracked
    * ext - external objects and plugings that can't be placed anywhere else
    * man - necessary global manual + help nodes aggregation

most nodes can be missing when not used

some are bindes from parent mods (like bin is usually inherited from parent)


Game Cycle
----------

* cycle
    * handle control
    * evo
    * jobs and cues
    * draw

Entity Lifecycle
----------------

* load - run on prototype phase
* init - run when spawned on the scene
* evo
* draw
* kill

* active
* visible



Getting Started
===============


Tutorials and Game Examples
===========================

* life
* brownian motion
* galaxy evolution
* missile command
* space invaders/galaxian/galaga
* lunar lander/thrust
* asteroids
* captain forever
* pong
* snake
* tetris
* arcanoid
* sokoban
* vvvvvvv
* tower toppler
* pac-man/paku paku
* retro city rampage
* scorched earth/worms
* sim city
* symbos-like ui demo
* dune II/warcraft/c&c
* flow (joints)
* pinball (physics)
* tanx/battle city


API
===
List the structure and all library functions, dna samples etc

Reference
=========
List all lib functions, generic reusable dna entities etc...

FAQ
===
- how to define nodes
- how to spawn things from dna
- how to create an action
- how to create a ghost
- how to create a prop
- how to locate an entity
- apply actions to many entities
- how to use cues
- how to handle keyboard and mouse input
- how to kill an entity

