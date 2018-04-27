
let Z = 1000

let Building = function(st) {
    this.type = 2
    this.Z = Z++
    this.Y = 0
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
    this.hits = 0
    this.buildingType = lib.math.rndi(4)
}

Building.prototype.test = function(x) {
    return (this.Y === 0 && x >= this.p.x - this.w/2 && x <= this.p.x + this.w/2)
}

Building.prototype.topSmoke = function() {
    sys.spawn('Emitter', {
            x: this.p.x - this.shift[this.floor-1],
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
    // building type selection
    switch(this.buildingType) {
    case 0:
        let shift = this.p.x - x
        shift = lib.math.limitMax(shift, this.w * env.tuning.maxSectionShift)
        shift = lib.math.limitMin(shift, -this.w * env.tuning.maxSectionShift)
        this.shift[this.floor] = shift
        this.section[this.floor++] = 0 + lib.math.rndi(3)
        break;
    case 1:
        this.shift[this.floor] = 0
        this.section[this.floor++] = 3 + lib.math.rndi(4)
        break;
    case 2:
        this.shift[this.floor] = 0
        this.section[this.floor++] = 8 + lib.math.rndi(6)
        break;
    case 3:
        this.shift[this.floor] = 0
        this.section[this.floor++] = 15 + lib.math.rndi(4)
        break;
    }

    this.foundationSmoke()
    this.topSmoke()

    if (this.floor === 1) lib.sfx(res.sfx.explosion[0], 0.7)
    else lib.sfx(res.sfx.explosion[1], 0.5)

    if (this.floor > 10) {
        this.Y = 1 + lib.math.rndi(7)
    }
}

Building.prototype.evo = function(dt) {
}

Building.prototype.draw = function() {
	ctx.save()
	ctx.translate(this.p.x, this.p.y)

    ctx.imageSmootingEnabled = false

    let by = -this.fh
    for (let i = 0; i < this.floor; i++) {
        let img = res.section[this.section[i]]
        if (!img) img = res.section[7]
        ctx.drawImage(img, -this.w/2 - this.shift[i], by, this.w, this.fh)

        let alpha = '00'
        switch (this.Y) {
        case 1: alpha = '30'; break;
        case 2: alpha = '40'; break;
        case 3: alpha = '50'; break;
        case 4: alpha = '60'; break;
        case 5: alpha = '70'; break;
        case 6: alpha = '80'; break;
        case 7: alpha = 'A0'; break;
        }
        ctx.fillStyle = '#050010' + alpha
        ctx.fillRect(-this.w/2 - this.shift[i], by, this.w, this.fh)
        by -= this.fh
    }

	ctx.restore()
}

Building.prototype.demolish = function() {
    this.topSmoke()
    this.foundationSmoke()

    this.shift.slice(1)
    this.section.slice(1)
    this.floor--
    if (this.floor === 0) {
        this.__.detach(this)
    }
    this.topSmoke()
}

Building.prototype.destroy = function() {
    if (this.Y > 0) {
        this.hits++
        if (this.hits >= this.Y) {
            this.demolish()
        }
    } else {
        this.demolish()
    }
}

module.exports = Building
