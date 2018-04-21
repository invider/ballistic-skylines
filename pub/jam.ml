> sprite info
> cheatsheet
> jam invaders
> /pub node shared and common between mods
> sprite sheets
> tiles from bitmaps
> tiles from text map
> console
> text/floating
> text/rolling
> ui/panels
> ui/labels
> ui/buttons
> ui/lists
> ui/editfield
> ui/scroller
> ui/progressBar
> ui/scrollpanes
> ui/menu
> ui/browser
> hero link in the root
> load all dir entries into an array by dir name pattern
> load into array by name foo-1.png, foo-2.png etc into foo[]
> _inject service node to auto-inject dependencies
> _aug service node to auto-mixin traits
> different patch modes (extend, augment, replace, push etc) by name convention or some kind of exported object flags

> multi-channel sfx support
> color-to-alpha for image
> color-to-color map for image (e.g. team color for a sprite like in MAX, Dune, C&C etc) 

> hide cursor
> set cursor img
> hide&custom rendered cursor
> require(path)?
> mods with different canvases
> additional context drawing (on memory image)
> autoload res node (for manual autoload - put string and get resource, including loading res counter)
> move /res autoloading functionality into other specialized autoloading node (create manually to define and load resources)
>>> install as node module and get dependencies from public git repos

> refactor topology to be accessed in 2 predefined places (sys and base) unless overrided
> audiosprite support?
>> plasmoid ui
    > text nodes
    > anchor nodes
    > group nodes
    > event plumbing rules
>> online help
> augmentation service nodes
> dependency service nodes
> image bits manipulation
> bitmap font support
> angel font support
> various canvas scaling modes
> preserve aspect rate mode
> fixed resolution mode

>> trap recorder
>> console
>> scene browser
>>> resource explorer (pixtures/sound/text)
>>> pixel editor (e.g. Aseprite)
>> sprite sheet generator/composer
>> font image generator
>> tile editor
>> sprite animation editor
>> texture/tile generator
>> planet generator
>> space ship generator
>> space invaders generator
>> pixel character generator
>> imaage variator/filter
>>> sound wave editor
>>> chiptune tracker
>>> sfx generator
>> alien speach generator
>> sound effects/variator
>> ghost mode - evo without draw (to run in debug or on nodejs)
>> refactor echo() into a standard routing node?
>> different traps to distinguish between external and internal events (trap() and etrap()?) or maybe flag in the event obj?
>> -time support to rewind (e.g. Braid)
>>> webgl support
>>> local.js generation and packaging
>>> desktop app packaging (Elektron?)
>>> phone app packaging (PhoneGap?)

V camera
V ext mod to place default extentions
V different types of /dna - Constructor(), factory(), obj.clone(), obj{}
V sprites
V universal particle emitter (inject particle draw, behavior, parameters etc)
V automatic tile mapping from file name (e.g. tiles.map-16x20.png)
V font resource patching
V z-ordering for mods and entities
V text file resource patching
V csv resource patching
V json resource patching
V figure out how to provide sequencial loading for fixes
V Z-ordering of nodes in lab
V postponed sorted evaluation of loaded scripts
V generate static topology
V fps counter
