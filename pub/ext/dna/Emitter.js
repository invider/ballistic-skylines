let FADEOUT = 0.3 // default particle fadeout value

let Particle = function(dat) {
    this.alive = true
    sys.augment(this, dat)

    if (!this.img && !this.color) this.color = '#ffffff'
    this.gr = -this.r
    this.dx = Math.cos(this.angle) * this.speed
    this.dy = Math.sin(this.angle) * this.speed


    this.evo = function(dt) {
        this.move(dt)
        this.lifespan -= dt 
        if (this.lifespan < 0) this.alive = false
    }
}

var Emitter = function(init) {
    // tuning
    this.dead = false
    this.blend = 'source-over'

    // augmenting
    augment(this, init)

    // fixing with defaults
    if (!this.lifespan) this.lifespan = 2
    if (!this.force) this.force = 200
    if (!this.size) this.size = 1
    if (!this.vsize) this.vsize = 0
    if (!this.speed) this.speed = 100
    if (!this.vspeed) this.vspeed = 0
    if (!this.angle) this.angle = 0
    if (!this.spread) this.spread = Math.PI * 2
    if (!this.minLifespan) this.minLifespan = 1
    if (!this.vLifespan) this.vLifespan = 0
    if (this.force) this.frequency = 1/this.force

    this.potential = 0
    this.particles = []
}

Emitter.prototype.init = function(parent, scene) {
}

Emitter.prototype.onExhausted = function() {
}

Emitter.prototype.moveParticle = function(dt) {
    this.x += this.dx * dt
    this.y += this.dy * dt
}
    
Emitter.prototype.drawParticle = function() {
    if (this.img) {
        ctx.globalAlpha = 0.5
        ctx.drawImage(this.img, this.x-this.r/2, this.y-this.r/2, this.r, this.r);
    } else {
        ctx.beginPath();
        if (this.lifespan < FADEOUT) {
            ctx.globalAlpha = this.lifespan/FADEOUT
        } else {
            ctx.globalAlpha = 1
        }
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color
        ctx.fill();
    }
}

Emitter.prototype.createParticle = function() {
    return new Particle({
        img: this.img,
        color: this.color,
        x: 0,
        y: 0, 
        r: this.size + lib.math.rnd(this.vsize),
        speed: this.speed + lib.math.rnd(this.vspeed),
        angle: this.angle + lib.math.rnd(this.spread),
        lifespan: this.minLifespan + lib.math.rnd(this.vLifespan)
    })
}

Emitter.prototype.spawn = function() {
    var p = this.createParticle()
    if (!p.draw) p.draw = this.drawParticle
    if (!p.move) p.move = this.moveParticle

    // find a slot
    var placed = false
    for (var i = 0; i < this.particles.length; i++) {
       if (!this.particles[i].alive) {
           this.particles[i] = p
           placed = true
           break;
       }
    }
    if (!placed) this.particles.push(p)
}

Emitter.prototype.emit = function(dt) {
    // emitting
    this.potential += dt
    while (this.lifespan !== 0 && this.potential >= this.frequency) {
        this.potential -= this.frequency
        this.spawn()
    }
}

Emitter.prototype.evo = function(dt) {
    if (this.dead) this.__.detach(this)

    if (this.lifespan > 0) {
        this.lifespan -= dt
        if (this.lifespan < 0) {
            this.lifespan = 0
            this.onExhausted()
        }
    }

    this.emit(dt)

    // mutating particles
    var pn = 0
    this.particles.forEach( p => {
        if (p.alive) {
            pn++
            p.evo(dt)
        }
    })

    if (pn === 0 && this.lifespan === 0) {
        this.dead = true
    }
}

Emitter.prototype.draw = function() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.globalCompositeOperation = this.blend

    var i = 0
    this.particles.forEach( p => {
        i++
        if (p.alive) p.draw()
    })
    ctx.restore()
}

module.exports = Emitter
