let Capsule = function(st) {
    sys.augment(this, st)

    this.collidable = true
    this.w = this.w || 10
    this.h = this.h || 10
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
        log.out('growing')
        building.build()
    } else {
        // build new building
        log.out('net building')
        building = sys.spawn('Building', {
            p: {
                x: x,
                y: 0,
            }
        }, 'camera')
        building.build()
    }
}

Capsule.prototype.evo = function(dt) {
	var p = this.p
	p.t = p.t + dt
	p.x = this.x + p.vx * p.t
	p.y = this.y + p.vy * p.t + env.tuning.G * p.t * p.t
	if(p.y > 0) {
        // hit the ground
		this.ground(p.x)
        this.x = p.x
		this.y = p.y
		p.vx = 0
		p.vy = 0
        // remove the capsule
        this.__.detach(this)
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
