let Capsule = function(st) {
    sys.augment(this, st)

    this.collidable = true
    this.w = this.w || 1
    this.h = this.h || 1
    this.color = this.color || '#700090'
    this.p = {
    	vx: this.v * lib.math.vecX(this.a),
    	vy: -this.v * lib.math.vecY(this.a),
    	x: this.x,
    	y: this.y,
    	t: 0
    }
}

Capsule.prototype.ground = function(x, y) {
	// TODO: hit ground
}

Capsule.prototype.evo = function(dt) {
	var p = this.p
	p.t = p.t + dt
	p.x = this.x + p.vx * p.t
	p.y = this.y + p.vy * p.t + 4.6 * p.t * p.t
	if(p.y > 0) {
		this.ground(p.x, p.y = 0)
	}
}

Capsule.prototype.draw = function() {
	ctx.save()
	ctx.fillStyle = this.color
	ctx.translate(this.p.x, this.p.y)
	ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h)
	ctx.restore()
}

module.exports = Capsule
