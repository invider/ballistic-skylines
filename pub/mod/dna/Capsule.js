let Capsule = function(st) {
    sys.augment(this, st)

    this.collidable = true
}

Capsule.prototype.evo = function(dt) {
}

Capsule.prototype.draw = function() {
}

module.exports = Capsule
