let Building = function(st) {
    sys.augment(this, st)
    this.w = this.w || 20
    this.dh = this.dh || 1
    this.color = this.color || '#700090' 
    this.h = 0
}

Building.prototype.evo = function(dt) {
	this.h = this.h + this.dh * dt 
}

Building.prototype.draw = function() {
	ctx.save()
	ctx.fillStyle = this.color
	ctx.translate(this.p.x, this.p.y)
	ctx.fillRect(-this.w/2, 0, this.w, -this.h)
	ctx.restore()
}

module.exports = Building
