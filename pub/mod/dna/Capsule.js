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

    sys.augment(this, this.type || Capsule.Type.Build)
}

Capsule.prototype.explode = function() {
    sys.spawn('Emitter', {
            x: this.p.x,
            y: this.p.y,
            img: res.dustParticle,
            lifespan: 0.5,
            force: 300,
            size: 20, vsize: 10,
            speed: 50, vspeed: 0,
            angle: Math.PI,
            spread: Math.PI,
            minLifespan: 0.5,
            vLifespan: 0.5,
    }, 'camera')
    lib.sfx(res.sfx.explosion[lib.math.rndi(res.sfx.explosion.length)], 0.7)
}

Capsule.Type = {
	Build: {
        ore: 2,
        label: 'Construct',
		ground: function(x) {
			if (x < env.worldStart || x > env.worldEnd) {
                this.explode()
				return
			}

			// find if a building is there
			let building = null
			lab.camera._ls.forEach(e => {
				if (e instanceof dna.Building && e.test(x)) building = e
			})

			if (building) {
				// grow existing
				building.build(x, env.tuning)
			} else {
                let scoop = false
                lab.camera._ls.forEach(e => {
                    if (e instanceof dna.Scoop && e.test(x, env.scoopFreeSpace)) {
                        scoop = true
                    }
                })
                if (scoop) {
                    this.explode()
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
		}
	},
	Teleport: {
        ore: 5,
        label: 'Teleport',
		ground: function(x) {
			if (x < env.worldStart || x > env.worldEnd) {
                this.explode()
				return
			}

            lab.gun.emplode()
			lab.gun.x = x
            lab.gun.teleport()
            lab.gun.capsuleType.base()

			lab.camControls.stop()
			lab.camera.target = {
				x: x,
				y: lab.camera.y
			}
		}
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
