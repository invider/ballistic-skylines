let Meteor = function() {
    this.w = 16
    this.h = 16

    let hitX = env.worldStart + (lib.math.rndf() * (env.worldEnd - env.worldStart))
    this.dx = -100 - lib.math.rndi(600)
    this.dy = 800 + lib.math.rndi(600)

    this.x = -this.dx * 5 + hitX
    this.y = -this.dy * 5
}

Meteor.prototype.evo = function(dt) {
    this.x += this.dx * dt
    this.y += this.dy * dt

    if (this.y > 0) {
        sys.spawn('Emitter', {
                x: this.x,
                y: 0,
                img: res.dustParticle,
                lifespan: 1,
                force: 100,
                size: 30, vsize: 20,
                speed: 50, vspeed: 0,
                angle: Math.PI,
                spread: Math.PI,
                minLifespan: 0.7,
                vLifespan: 0.8,
        }, 'camera')
        lib.sfx(res.sfx.explosion[1], 1)

        this.__.detach(this)
    }
}

Meteor.prototype.draw = function(dt) {
	ctx.save()
	ctx.translate(this.x, this.y)
    ctx.drawImage(res.capsule, -this.w/2, -this.h/2, this.w, this.h)
	ctx.restore()
}

module.exports = Meteor

