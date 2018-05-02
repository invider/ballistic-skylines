let BLINK = 2
let MAX_LEVEL = 4

let Section = function(st) {
    sys.augment(this, st)
}

let Building = function(st) {
    this.type = 2
    this.timer = 0
    this.Z = env.Z++
    this.Y = 0

    sys.augment(this, st)

    this.x = this.p.x
    this.y = this.p.y
    this.w = this.w || 64
    this.color = this.color || '#700090' 
    this.floor = 0
    this.section = []
    this.root = null
    this.hits = 0
    this.buildingType = lib.math.rndi(5)
    this.roofFloor = 5 + lib.math.rndi(5)
    this.lightFloor = 7 + lib.math.rndi(5)
    this.lightConfig = lib.math.rndi(5)
}

Building.prototype.test = function(x) {
    return (this.Y === 0 && x >= this.p.x - this.w/2 && x <= this.p.x + this.w/2)
}

Building.prototype.levelUp = function() {
    if (this.Y < MAX_LEVEL) this.Y++
}

Building.prototype.topSmoke = function() {
    if (this.floor <= 0) return
    sys.spawn('Emitter', {
            x: this.p.x - this.section[this.floor-1].dx,
            y: this.p.y - this.floor * this.section[this.floor-1].h,
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
        this.section[this.floor++] = {
            type: lib.math.rndi(3),
            dx: shift,
            w: 64,
            h: 32,
        }
        break;
    case 1:
        this.section[this.floor++] = {
            type: 3 + lib.math.rndi(4),
            dx: 0,
            w: 64,
            h: 32,
        }
        break;
    case 2:
        this.section[this.floor++] = {
            type: 8 + lib.math.rndi(6),
            dx: 0,
            w: 64,
            h: 32,
        }
        break;
    case 3:
        this.section[this.floor++] = {
            type: 15 + lib.math.rndi(4),
            dx: 0,
            w: 64,
            h: 32,
        }
        break;
    case 4:
        this.section[this.floor++] = {
            type: 19 + lib.math.rndi(3),
            dx: 0,
            w: 64,
            h: 32,
        }
        break;
    }
    if (!this.roof && this.floor > this.roofFloor) {
        let t = -1
        switch(this.buildingType) {
            case 3:
                t = lib.math.rndi(4)
                break;
            case 0: case 1:
                t = 4 + lib.math.rndi(4)
                break;
        }
        if (t >= 0) {
            this.roof = {
                t: t,
                dx: this.section[this.floor-1].dx,
                w: 64,
                h: 32,
            }
        }
    } else if (this.roof) {
        this.roof.dx = this.section[this.floor-1].dx
    }

    this.foundationSmoke()
    this.topSmoke()

    if (this.floor === 1) lib.sfx(res.sfx.explosion[0], 0.7)
    else lib.sfx(res.sfx.explosion[1], 0.5)

    // TODO make move to background as a collective of block of buildings
    //      when cummulative average hight reaches some point
    /*
    if (this.floor > 10) {
        this.Y = 1 + lib.math.rndi(7)
    }
    */
}

Building.prototype.evo = function(dt) {
    this.timer += dt
}

Building.prototype.draw = function() {
	ctx.save()
	ctx.translate(this.p.x, this.p.y)

    ctx.imageSmootingEnabled = false
    if (this.Y > 0) {
        let alpha = '00'
        switch (this.Y) {
        case 1: alpha = '50'; break;
        case 2: alpha = '70'; break;
        case 3: alpha = '90'; break;
        case 4: alpha = 'B0'; break;
        }
        ctx.fillStyle = '#050010' + alpha
    }

    let by = -this.section[0].h
    for (let i = 0; i < this.floor; i++) {
        let img = res.section[this.section[i].type]
        if (!img) img = res.section[7]

        ctx.drawImage(img, -this.section[i].w/2 - this.section[i].dx, by, this.section[i].w, this.section[i].h)
        if (this.Y > 0) ctx.fillRect(-this.section[i].w/2 - this.section[i].dx, by, this.section[i].w, this.section[i].h)

        by -= this.section[i].h
    }
    if (this.roof) {
        ctx.drawImage(res.roof[this.roof.t], -this.roof.w/2 - this.roof.dx, by, this.roof.w, this.roof.h)
        if (this.Y > 0) ctx.fillRect(-this.roof.w/2 - this.roof.dx, by, this.roof.w, this.roof.h)
    }

    by += this.section[this.floor-1].h
    if (this.floor >= this.lightFloor && this.timer > BLINK) {
        // blink
        ctx.fillStyle = '#FF2020FF';
        if (this.lightConfig <= 1) {
            ctx.fillRect(-this.section[this.floor-1].w/2-2 - this.section[this.floor-1].dx, by, 4, 4)
        }
        if (this.lightConfig >= 1 && this.lightConfig < 3) {
            ctx.fillRect(this.section[this.floor-1].w/2-2 - this.section[this.floor-1].dx, by, 4, 4)
        }

        if (this.timer > BLINK*2) this.timer = 0
    }

	ctx.restore()
}

Building.prototype.demolish = function() {
    this.topSmoke()
    this.foundationSmoke()

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
