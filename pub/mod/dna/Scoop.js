let Scoop = function(st) {
    this.type = 3
    this.Z = 1000

    sys.augment(this, st)

    this.w = env.scoopWidth
    this.h = 12
    this.construct()
    lib.sfx(res.sfx.scoop, 0.7)
}

Scoop.prototype.construct = function() {
    this.c2(-150)
    this.c2(150)
}

Scoop.prototype.c2 = function(dx) {
    sys.spawn('Emitter', {
            dx: dx,
            x: this.x,
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

    ctx.fillStyle = '#C06000'
    ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h)
	ctx.restore()
}

Scoop.prototype.destroy = function() {
    this.__.detach(this)
}

module.exports = Scoop
