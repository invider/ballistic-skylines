
let Z = 1000

let Building = function(st) {
    this.type = 2
    this.Z = Z++
    env.maxBuildingZ = Z

    sys.augment(this, st)

    this.x = this.p.x
    this.y = this.p.y
    this.w = this.w || 64
    this.color = this.color || '#700090' 
    this.floor = 0
    this.fh = 32
    this.section = []
    this.shift = []
}

Building.prototype.test = function(x) {
    return (x >= this.p.x - this.w/2 && x <= this.p.x + this.w/2)
}

Building.prototype.foundationSmoke = function() {
    sys.spawn('Emitter', {
            x: this.p.x,
            y: this.p.y,
            img: res.dustParticle,
            lifespan: 1,
            force: 200,
            size: 10, vsize: 4,
            speed: 20, vspeed: 5,
            angle: Math.PI,
            spread: 0.5,
            minLifespan: 1,
            vLifespan: 1 
    }, 'camera')
    sys.spawn('Emitter', {
            x: this.p.x,
            y: this.p.y,
            img: res.dustParticle,
            lifespan: 1,
            force: 200,
            size: 10, vsize: 4,
            speed: 20, vspeed: 5,
            angle: Math.PI*2 - 0.5,
            spread: 0.5,
            minLifespan: 1,
            vLifespan: 1 
    }, 'camera')
}

Building.prototype.build = function(x) {
    let shift = this.p.x - x
    shift = lib.math.limitMax(shift, this.w * env.tuning.maxSectionShift)
    shift = lib.math.limitMin(shift, -this.w * env.tuning.maxSectionShift)
    this.shift[this.floor] = shift
    this.section[this.floor++] = lib.math.rndi(3)

    this.foundationSmoke()

    sys.spawn('Emitter', {
            x: this.p.x - shift,
            y: this.p.y - this.floor * this.fh,
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

    if (this.floor === 1) lib.sfx(res.sfx.explosion[0], 0.7)
    else lib.sfx(res.sfx.explosion[1], 0.5)
}

Building.prototype.evo = function(dt) {
}

Building.prototype.draw = function() {
	ctx.save()
	ctx.translate(this.p.x, this.p.y)

    ctx.imageSmootingEnabled = false

    let by = -this.fh
    for (let i = 0; i < this.floor; i++) {
        ctx.drawImage(res.section[this.section[i]],
            -this.w/2 - this.shift[i], by, this.w, this.fh)
        by -= this.fh
    }

	ctx.restore()
}

Building.prototype.demolish = function() {
    this.shift.slice(1)
    this.section.slice(1)
    this.floor--
    this.foundationSmoke()
    if (this.floor === 0) {
        this.__.detach(this)
    }
}

Building.prototype.destroy = function() {
    this.demolish()
}

module.exports = Building
