let Scoop = function(st) {
    this.type = 3
    this.Z = env.Z++

    sys.augment(this, st)

    this.w = env.scoopWidth
    this.h = 32
    this.y = -17
    this.hits = 0

    this.construct()
    lib.sfx(res.sfx.scoop, 0.4)
}

Scoop.prototype.construct = function() {
    this.c2(this.x, -150)
    this.c2(this.x, 150)
}

Scoop.prototype.c2 = function(x, dx) {
    sys.spawn('Emitter', {
            dx: dx,
            x: x,
            y: this.y,
            color: '#FFD080',
            lifespan: 0.75,
            force: 300, // particles/second
            size: 6, vsize: 4,
            speed: 100, vspeed: 50,
            angle: Math.PI,
            spread: Math.PI,
            minLifespan: 0.3,
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

Scoop.prototype.test = function(x, w) {
    return (x+w/2 >= this.x - this.w/2 && x <= this.x + this.w/2)
}

Scoop.prototype.evo = function(dt) {
}

Scoop.prototype.draw = function() {
	ctx.save()
	ctx.translate(this.x, this.y)

    ctx.drawImage(res.scoop, -this.w/2, -this.h/2, this.w, this.h)
	ctx.restore()
}

Scoop.prototype.destroy = function() {
    if (this.lastHit && env.timer-this.lastHit < env.scoopHitTime) {
        this.hits++
        this.lastHit = env.timer

        if (this.hits >= env.scoopHits) {
            this.c2(this.x+this.w/2, -150)
            this.c2(this.x-this.w/2, 150)
            this.__.detach(this)
        }
    } else {
        this.hits = 1
        this.lastHit = env.timer
    }
}

module.exports = Scoop
