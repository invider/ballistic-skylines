let Building = function(st) {
    sys.augment(this, st)

    this.w = this.w || 64
    this.h = this.h || 32
    this.color = this.color || '#700090' 
    this.floor = 1
}

Building.prototype.test = function(x) {
    return (x >= this.p.x - this.w/2 && x <= this.p.x + this.w/2)
}

Building.prototype.evo = function(dt) {
}

Building.prototype.draw = function() {
	ctx.save()
	ctx.translate(this.p.x, this.p.y)

    ctx.imageSmootingEnabled = false

    let by = -this.h
    for (let i = 0; i < this.floor; i++) {
        ctx.drawImage(res.section[2], -this.w/2, by, this.w, this.h)
        by -= this.h
    }

	ctx.restore()
}

module.exports = Building
