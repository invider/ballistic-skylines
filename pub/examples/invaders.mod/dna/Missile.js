let Missile = function(dat) {
    this.type = 2
    dna.Sprite.call(this, dat)

    this.r = this.w/2
}

Missile.prototype = new dna.Sprite()

Missile.prototype.hit = function(t) {
    sys.spawn('Emitter', {
        x: this.x,
        y: this.y,
        color: '#808080',
        lifespan: 1,
        force: 300,
        size: 3, vsize: 2,
        speed: 15, vspeed: 15,
        angle: 0,
        spread: Math.PI*2,
        minLifespan: 1,
        vLifespan: 0, 
    })
    sys.spawn('Emitter', {
        x: t.x,
        y: t.y,
        color: '#ff8080',
        lifespan: 0.5,
        force: 400,
        size: 2, vsize: 0,
        speed: 40, vspeed: 0,
        angle: 0,
        spread: Math.PI*2,
        minLifespan: 0.7,
        vLifespan: 0, 
    })

    t.kill()
    this.kill()
}

Missile.prototype.kill = function() {
    this.__.detach(this)
}

Missile.evo = function(dt) {
    dna.Sprite.call(this, dt)

    if (this.y < -this.h) this.kill()
}

module.exports = Missile
