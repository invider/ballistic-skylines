let mv = []

let BARREL = 50
let MIN_AIM = Math.PI + 0.4
let MAX_AIM = 2*Math.PI - 0.4
let TURN = 2

let Gun = function(st) {
    this.w = 64
    this.h = 64
    this.name = 'gun'

    sys.augment(this, st)

    this.aim = 5.5
    this.power = 0
    this.recharge = 100
}

Gun.prototype.charge = function() {
    mv[3] = true
}

Gun.prototype.fire = function() {
    mv[3] = false
    // shoot
    log.out('fire power: ' + this.power)
    sys.spawn('Capsule', {
        x: this.x,
        y: this.y - this.h/2,
        a: this.aim,
        v: this.power,
        w: 10,
        h: 10,
    }, 'camera')

    this.power = 0
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
        this.aim = lib.math.limitMin(lib.math.normalizeAngle(this.aim - TURN * dt), MIN_AIM)
    }
    if (mv[2]) {
        this.aim = lib.math.limitMax(lib.math.normalizeAngle(this.aim + TURN * dt), MAX_AIM)
    }
    if (mv[3]) {
        this.power += this.recharge * dt
    }
    env.status = this.aim
}

Gun.prototype.draw = function() {
    ctx.save()
    ctx.translate(this.x, this.y)

    let bx = lib.math.vecX(this.aim) * BARREL
    let by = lib.math.vecY(this.aim) * BARREL

    ctx.fillStyle = '#700090'
    ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h)

    ctx.strokeStyle = '#ff0090'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(0, -this.h/2)
    ctx.lineTo(bx, by-this.h/2)
    ctx.stroke()


    ctx.restore()
}

module.exports = Gun
