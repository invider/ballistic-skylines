let Scoop = function(st) {
    this.Z = 1000

    sys.augment(this, st)

    this.w = 250
    this.h = 20
}

Scoop.prototype.test = function(x, w) {
    return (x+w/2 >= this.x - this.w/2 && x <= this.x + this.w/2)
}

Scoop.prototype.evo = function(dt) {
}

Scoop.prototype.draw = function() {
	ctx.save()
	ctx.translate(this.x, this.y)

    ctx.fillStyle = '#C06000'
    ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h)
	ctx.restore()
}

module.exports = Scoop

