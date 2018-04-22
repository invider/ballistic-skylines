let mv = []

let BARREL = 50

let MIN_AIM = Math.PI + 0.4
let MAX_AIM = 2*Math.PI - 0.4
let TURN_SPEED = 2

let Gun = function(st) {
    this.w = 64
    this.h = 32
    this.name = 'gun'

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

Gun.prototype.fire = function() {
    mv[3] = false
    mv[4] = false

    if (this.charge> env.tuning.minCharge) {
        // shoot
        sys.spawn('Capsule', {
            x: this.x,
            y: this.y - this.h/2,
            a: this.aim,
            v: this.charge,
            w: 10,
            h: 10,
        }, 'camera')
        this.lastCharge = this.charge
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
    // next weapon type
}

Gun.prototype.prev = function(dir) {
    // prev weapon type
}

Gun.prototype.evo = function(dt) {
    if (mv[1]) {
        // turn left
        this.aim = lib.math.limitMin(
            lib.math.normalizeAngle(this.aim - TURN_SPEED * dt), MIN_AIM)
    }
    if (mv[2]) {
        // turn right
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
    env.status = this.aim
}

Gun.prototype.draw = function() {
    ctx.save()
    ctx.translate(this.x, this.y)


    ctx.fillStyle = '#700090'
    ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h)

    // show barrel and charge rate
    let bx = lib.math.vecX(this.aim) * BARREL
    let by = lib.math.vecY(this.aim) * BARREL
    ctx.strokeStyle = '#900070'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(0, -this.h/2)
    ctx.lineTo(bx, by-this.h/2)
    ctx.stroke()

    let charge = (1 - this.charge/this.maxCharge) * BARREL
    let cx = lib.math.vecX(this.aim) * charge
    let cy = lib.math.vecY(this.aim) * charge

    if (this.charge < env.tuning.minCharge) ctx.strokeStyle = '#ff0000'
    else ctx.strokeStyle = '#ffff00'
    ctx.beginPath()
    ctx.moveTo(bx, by-this.h/2)
    ctx.lineTo(cx, cy - this.h/2)
    ctx.stroke()

    ctx.restore()
}

module.exports = Gun
