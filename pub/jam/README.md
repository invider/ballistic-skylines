=== Collider.jam ===
====================


What is Collider.jam
====================

The goal is to have a simple rapid game prototyping framework
that can easily be learned by newly formed teams on jams.


There are a few key concepts you need to know about the framework to use it.

scene - the main game tree. Everything (resources, entities, settings etc...)  is supposed to be on the scene.
mod - is a game state with particular structure. Scene is also a special case of root mod.


Frame
=====

Frame is a group node object. Everything on scene that is not leaf, must be a Frame or it's descendant.

The most essential functions to use:

* attach(node) - attach the node to this frame
* select(path) - select an array of node descendant following path pattern
* selectOne(path) - select only one node matching path search pattern

Other important functions:

* init - called each time a node is attached somewhere on the tree
* spawn - called only when node is attached to /lab

Each frame when attached has special values injected:
_ - points on parent mod (node's contect)
__ - points on parent node


Mod structure
=============

* sys - core system functions to manipulate the scene. Each new mod inherits a copy from the parent one.
* lib - library functions
* log - logs and logging functions
* dna - hibernated entity objects that can be copied into /lab
* env - global environment data and settings (only data, no functions)
* lab - place for entities
    * ghosts - entities that have evo() function but dont have any draw() representation
    * props - entities that have draw(), but dont have evo() and therefore dont have any behavior
    * actores - entities that have both draw() representation and evo() behavior

Each mod also has several special properties:
_ - always points on itself, since mod is the context by itself
___ - points on the parent mod (in scene points on itself)
_$ - points on the root mod (in scene points on itself)



How To
======

How to define a new actor
-------------------------
Just declare in global scope:

this['@dna/myActor'] = {
    evo: function(delta) {},
    draw: function(delta) {},
}

How to spawn an actor
---------------------
Copy actor node form /dna to /lab or attach the node directly to the /lab node

    _.sys.spawn('myActor')
    
or

    _.lab.attach(actorNode)

How to declare and spawn an actor
---------------------------------
Just declare in global scope:

this['@lab/myActor'] = {
    evo: function(delta) {},
    draw: function(delta) {},
}

