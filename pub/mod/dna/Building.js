let Building = function(st) {
    this.Z = 1
    sys.augment(this, st)

    this.w = this.w || 64
    this.color = this.color || '#700090' 
    this.floor = 0
    this.fh = 32
    this.section = []
}

Building.prototype.test = function(x) {
    return (x >= this.p.x - this.w/2 && x <= this.p.x + this.w/2)
}

Building.prototype.build = function() {
    this.section[this.floor++] = lib.math.rndi(3)
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

    sys.spawn('Emitter', {
            x: this.p.x,
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
}

Building.prototype.evo = function(dt) {
}

Building.prototype.draw = function() {
	ctx.save()
	ctx.translate(this.p.x, this.p.y)

    ctx.imageSmootingEnabled = false

    let by = -this.fh
    for (let i = 0; i < this.floor; i++) {
        ctx.drawImage(res.section[this.section[i]], -this.w/2, by, this.w, this.fh)
        by -= this.fh
    }

	ctx.restore()
}

module.exports = Building
