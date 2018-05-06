let BLINK = 2
let MAX_LEVEL = 4
let NEON_SPACING = 32
let FLOOR_HEIGHT = 32

let Section = function(st) {
    sys.augment(this, st)
}

let Banner = function(st) {
    this.dead = false
    this.visible = true
    this.vertical = false
    this.timer = 0
    this.timer2 = 0
    this.glowTime = 10 + lib.math.rndi(10)
    this.flickTime = 1
    this.margin = 2
    this.textSize = 12

    // determine color
    let c = '#FFBBEE'
    switch(lib.math.rndi(4)) {
    case 1: c = '#FF0000'; break;
    case 2: c = '#20EFFF'; break;
    case 3: c = '#59E6FF'; break;
    }
    this.color = c

    sys.augment(this, st)

    this.font = this.textSize + 'px zekton'
    ctx.font = this.font
    this.tw = ctx.measureText(this.text).width
    this.lw = Math.ceil(this.tw/this.text.length)

    if (this.vertical) {
        this.w = this.lw + this.margin*2
        this.h = this.text.length * (this.textSize + this.margin)
                    + this.margin*2
    } else {
        this.w = this.tw + this.margin*2
        this.h = this.textSize + this.margin*2
    }
}

Banner.prototype.evo = function(dt) {
    if (this.dead) return
    // flick
    this.timer += dt
    if (this.timer < this.glowTime) this.visible = true
    else {
        this.timer2 += dt
        if (this.timer2 > 0.05) {
            this.timer2 = 0
            this.visible = !this.visible
        }
        if (this.timer > this.glowTime + this.flickTime) {
            this.glowTime = 30 + lib.math.rndi(60)
            this.flickTime = 0.1 + lib.math.rndi(9)/9
            this.timer = 0
        }
    }
}

Banner.prototype.draw = function() {
    if (this.dead || !this.visible) return

    ctx.globalAlpha = 1
    ctx.strokeStyle = this.color
    ctx.fillStyle = this.color
    ctx.lineWidth = 1
    ctx.strokeRect(this.x-this.w/2, this.y-this.h/2, this.w, this.h)

    ctx.font = this.font
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    if (this.vertical) {
        let by = this.y - this.h/2 + this.textSize/2 + this.margin
        for (let i = 0; i < this.text.length; i++) {
            ctx.fillText(this.text.charAt(i), this.x, by)
            by += this.textSize + this.margin
        }
    } else {
        ctx.fillText(this.text, this.x, this.y)
    }
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
    this.banner = []
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

Building.prototype.bannerCount = function() {
    return this.banner.length
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

Building.prototype.neon = function() {
    let text = res.banner[lib.math.rndi(res.banner.length)]
    let margin = 2

    let textSize = 8
    switch(lib.math.rndi(6)) {
        case 1: textSize = 9; break;
        case 2: textSize = 10; break;
        case 3: textSize = 11; break;
        case 4: textSize = 12; break;
        case 5: textSize = 13; break;
    }
    let vertical = !!lib.math.rndi(2)

    // claculate banner parameters
    let font = textSize + 'px zekton'
    ctx.font = font
    let tw = ctx.measureText(text).width
    let lw = Math.ceil(tw/text.length)

    let h = textSize + margin*4
    let y = -16 - lib.math.rndi(this.floor*FLOOR_HEIGHT)
    if (vertical) {
        h = text.length * (textSize + margin) + margin*4
        y = -lib.math.rndi(this.floor*FLOOR_HEIGHT-h/2)
        if (y > -h/2) y = -h/2
    }

    let w = tw + margin*4
    let x = -20 + lib.math.rndi(40)
    if (vertical) {
        w = lw + margin*4
        x = this.w/2 + 5
        if (lib.math.rndi(2) > 0) x *= -1
    }

    // find out if the spot is free
    let occupied = false
    this.banner.forEach(b => {
        if (b.x+b.w/2 >= x-w/2
                && b.x-b.w/2 <= x+w/2
                && b.y+b.h/2 >= y-h/2
                && b.y-b.h/2 <= y+h/2) {
            occupied = true
        }
    })
    if (occupied) return

    // create and place the banner
    let nb = new Banner({
        x: x,
        y: y,
        vertical: vertical,
        text: text,
        textSize: textSize,
    })

    // find the optimal slot for new banner
    let bi = -1
    this.banner.forEach((b, i) => { if (b.dead) bi = i; })
    if (bi >= 0) this.banner[bi] = nb
    else this.banner.push(nb)
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
            h: FLOOR_HEIGHT,
        }
        break;
    case 1:
        this.section[this.floor++] = {
            type: 3 + lib.math.rndi(4),
            dx: 0,
            w: 64,
            h: FLOOR_HEIGHT,
        }
        break;
    case 2:
        this.section[this.floor++] = {
            type: 8 + lib.math.rndi(6),
            dx: 0,
            w: 64,
            h: FLOOR_HEIGHT,
        }
        break;
    case 3:
        this.section[this.floor++] = {
            type: 15 + lib.math.rndi(4),
            dx: 0,
            w: 64,
            h: FLOOR_HEIGHT,
        }
        break;
    case 4:
        this.section[this.floor++] = {
            type: 19 + lib.math.rndi(3),
            dx: 0,
            w: 64,
            h: FLOOR_HEIGHT,
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
                h: FLOOR_HEIGHT,
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
    this.banner.forEach(b => b.evo(dt))
}

Building.prototype.draw = function() {
	ctx.save()
	ctx.translate(this.p.x, this.p.y)

    ctx.imageSmootingEnabled = false

    let a = 1
    if (this.Y > 0) {
        let alpha = '00'
        switch (this.Y) {
        case 1: alpha = '50'; a = 0.7; break;
        case 2: alpha = '70'; a = 0.5; break;
        case 3: alpha = '90'; a = 0.3; break;
        case 4: alpha = 'B0'; a = 0.1; break;
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
        ctx.globalAlpha = a
        ctx.drawImage(res.roof[this.roof.t], -this.roof.w/2 - this.roof.dx, by, this.roof.w, this.roof.h)
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

    this.banner.forEach(b => b.draw())

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
    // normalize banners
    this.banner.forEach(b => {
        if (b.y < -this.floor*FLOOR_HEIGHT-20) b.dead = true
    })
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
