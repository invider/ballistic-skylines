let Capsule = function(st) {
    sys.augment(this, st)

    this.w = 15
    this.h = 15

    this.color = this.color || '#700090'
    this.p = {
    	vx: this.v * lib.math.vecX(this.a),
    	vy: this.v * lib.math.vecY(this.a),
    	x: this.x,
    	y: this.y,
    	t: 0
    }
}

Capsule.prototype.ground = function(x) {
    // find if a building is there
    let building = null
    lab.camera._ls.forEach(e => {
        if (e instanceof dna.Building && e.test(x)) building = e
    })

    if (building) {
        // grow existing
        building.build(x)
    } else {
        // build new building
        building = sys.spawn('Building', {
            p: {
                x: x,
                y: 0
            }
        }, 'camera')
        building.build(x)
    }
}

Capsule.prototype.evo = function(dt) {
	var p = this.p
	p.t = p.t + dt
	p.x = this.x + p.vx * p.t
	p.y = this.y + p.vy * p.t + env.tuning.gravity * p.t * p.t
	if(p.y > 0) {
        // hit the ground
		this.ground(p.x)
        // remove the capsule
        this.__.detach(this)
	}
}

Capsule.prototype.draw = function() {
	ctx.save()
	ctx.translate(this.p.x, this.p.y)
    ctx.drawImage(res.capsule, -this.w/2, -this.h/2, this.w, this.h)
	ctx.restore()
}

module.exports = Capsule
