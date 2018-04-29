let mv = []

let W = 64
let H = 32
let BARREL = 35
let CAPSULE_SHIFT = 7
let MOUNT_POINT = -14

let MIN_AIM = Math.PI + 0.4
let MAX_AIM = 2*Math.PI - 0.4
let TURN_SPEED = 2

let Gun = function(st) {
    this.type = 1
    this.Z = 1000000
    this.w = W
    this.h = H
    this.name = 'gun'
    this.capsuleType = (function(types) {
    	let index = 0;
    	return {
			value: function() {
				return types[index]
			},
            base: function() {
                index = 0
            },
			prev: function() {
				index = (index == 0 ? types.length : index) - 1
                lib.sfx(res.sfx.powerup, 0.6)
			},
			next: function() {
				let i=index+1
				index = i == types.length ? 0 : i
                lib.sfx(res.sfx.powerup, 0.6)
			}
    	}
    })(dna.Capsule.Type)

    sys.augment(this, st)

    this.aim = 5.5
    this.charge = 0
    this.rechargeSpeed = env.tuning.initialRechargeSpeed
    this.maxCharge = env.tuning.initialMaxCharge
    this.lastCharge = this.maxCharge
    this.lastFire = false
}

Gun.prototype.hold = function() {
    mv[3] = true
}

Gun.prototype.holdToLast = function() {
    mv[4] = true
}

Gun.prototype.unhold = function() {
    if (!this.lastFire) {
        lib.sfx(res.sfx.malfunction, 0.5)
    }
    mv[4] = false
    this.charge = 0
    this.lastFire = false
}

Gun.prototype.fire = function() {
    mv[3] = false
    mv[4] = false

    if (this.charge > env.tuning.minCharge && env.ore >= this.capsuleType.value().ore) {
        // shoot capsule
        let bx = lib.math.vecX(this.aim) * (BARREL+CAPSULE_SHIFT)
        let by = lib.math.vecY(this.aim) * (BARREL+CAPSULE_SHIFT)
        sys.spawn('Capsule', {
        	type: this.capsuleType.value(),
            x: this.x + bx,
            y: this.y - this.h/2 + by,
            a: this.aim,
            v: this.charge,
            w: 10,
            h: 10,
        }, 'camera')
        env.ore -= this.capsuleType.value().ore

        // puff
        sys.spawn('Emitter', {
                x: this.x + bx,
                y: this.y - this.h/2 + by,
                img: res.dustParticle,
                lifespan: 0.3,
                force: 75,
                size: 8, vsize: 4,
                speed: 60, vspeed: 5,
                angle: Math.PI*1.5 - 0.3,
                spread: 0.6,
                minLifespan: 0.6,
                vLifespan: 0.4
        }, 'camera')
        lib.sfx(res.sfx.shot, 0.5)

        this.lastCharge = this.charge
    } else {
        lib.sfx(res.sfx.malfunction, 0.5)
    }
    this.charge = 0
}

Gun.prototype.move = function(dir) {
    mv[dir] = true
}

Gun.prototype.stop = function(dir) {
    mv[dir] = false
}

Gun.prototype.next = function(dir) {
	this.capsuleType.next()
}

Gun.prototype.prev = function(dir) {
	this.capsuleType.prev()
}

Gun.prototype.evo = function(dt) {
    if (mv[1]) {
        // turn left
        if (this.aim > MIN_AIM && res.sfx.turn.paused) {
            lib.sfx(res.sfx.turn, 1)
        }
        this.aim = lib.math.limitMin(
            lib.math.normalizeAngle(this.aim - TURN_SPEED * dt), MIN_AIM)
    }
    if (mv[2]) {
        // turn right
        if (this.aim < MAX_AIM && res.sfx.turn.paused) {
            lib.sfx(res.sfx.turn, 1)
        }
        this.aim = lib.math.limitMax(
            lib.math.normalizeAngle(this.aim + TURN_SPEED * dt), MAX_AIM)
    }

    // charge the gun
    if (mv[3]) {
        this.charge= lib.math.limitMax(
            this.charge + this.rechargeSpeed * dt, this.maxCharge)
    } else if (mv[4] && !this.lastFire) {
        this.charge= lib.math.limitMax(
            this.charge + this.rechargeSpeed * dt, this.lastCharge)
        if (this.charge === this.lastCharge) {
            this.lastFire = true
            this.fire()
        }
    }
}

Gun.prototype.draw = function() {
    ctx.save()
    ctx.translate(this.x, this.y)


    // show barrel and charge rate
    let bx = lib.math.vecX(this.aim) * BARREL
    let by = lib.math.vecY(this.aim) * BARREL
    ctx.strokeStyle = '#505050'
    ctx.lineWidth = 10
    ctx.beginPath()
    ctx.moveTo(0, MOUNT_POINT)
    ctx.lineTo(bx, by + MOUNT_POINT)
    ctx.stroke()

    ctx.strokeStyle = '#202020'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(0, MOUNT_POINT)
    ctx.lineTo(bx, by + MOUNT_POINT)
    ctx.stroke()

    let charge = (1 - this.charge/this.maxCharge) * BARREL
    let cx = lib.math.vecX(this.aim) * charge
    let cy = lib.math.vecY(this.aim) * charge

    if (this.charge < env.tuning.minCharge) ctx.strokeStyle = '#ff0000'
    else ctx.strokeStyle = '#ff9000'
    ctx.beginPath()
    ctx.moveTo(bx, by + MOUNT_POINT)
    ctx.lineTo(cx, cy + MOUNT_POINT)
    ctx.stroke()

    // draw body
    ctx.drawImage(res.gun, -this.w/2, -this.h/2 - 2, this.w, this.h)

    ctx.restore()
}

Gun.prototype.teleport = function() {
    sys.spawn('Emitter', {
            x: this.x,
            y: this.y,
            color: '#5080FF',
            lifespan: 1.5,
            force: 500, // particles/second
            size: 8, vsize: 4,
            speed: 80, vspeed: 10,
            angle: Math.PI,
            spread: Math.PI,
            minLifespan: 0.8,
            vLifespan: 0.2,
            drawParticle: function() {
                if (this.lifespan < 0.5) {
                    ctx.globalAlpha = this.lifespan/0.5
                } else {
                    ctx.globalAlpha = 1
                }
                ctx.fillStyle = this.color
                ctx.fillRect(this.x, this.y, this.r, this.r)
            },
    }, 'camera')
    lib.sfx(res.sfx.teleport, 0.4)
}

Gun.prototype.emplode = function() {
    sys.spawn('Emitter', {
            x: this.x,
            y: this.y,
            color: '#FFFF80',
            lifespan: 1.2,
            force: 400,
            size: 6, vsize: 4,
            speed: 50, vspeed: 40,
            angle: Math.PI,
            spread: Math.PI,
            minLifespan: 0.5,
            vLifespan: 0.2,
            drawParticle: function() {
                if (this.lifespan < 0.5) {
                    ctx.globalAlpha = this.lifespan/0.5
                } else {
                    ctx.globalAlpha = 1
                }
                ctx.fillStyle = this.color
                ctx.fillRect(this.x, this.y, this.r, this.r)
            },
    }, 'camera')
}

module.exports = Gun
