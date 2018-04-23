let Meteor = function() {
    this.w = 16
    this.h = 16

    let hitX = env.worldStart + (lib.math.rndf() * (env.worldEnd - env.worldStart))
    this.dx = -env.tuning.meteorSpeedX - lib.math.rndi(env.tuning.meteorSpeedVX)
    this.dy = env.tuning.meteorSpeedY - lib.math.rndi(env.tuning.meteorSpeedVY)

    this.x = -this.dx * 5 + hitX
    this.y = -this.dy * 5
}

Meteor.prototype.ground = function() {
    sys.spawn('Emitter', {
            x: this.x,
            y: 0,
            img: res.dustParticle,
            lifespan: 0.2,
            force: 150,
            size: 30, vsize: 20,
            speed: 50, vspeed: 0,
            angle: Math.PI,
            spread: Math.PI,
            minLifespan: 0.5,
            vLifespan: 0.3,
    }, 'camera')
    if (lab.camera.inView(this.x, this.y)) lib.sfx(res.sfx.meteor, 1)

    let x = this.x
    lab.camera._ls.forEach(e => {
        if (e instanceof dna.Building && e.test(x)) {
            e.demolish()
            sys.spawn('text/fadeText', {
                font: '24px zekton',
                fillStyle: '#f01020',
                x: lab.camera.screenX(this.x),
                y: lab.camera.screenY(this.y) - 50,
                text: 'Building Hit!',
                dx: 20,
                dy: -30,
                ttl: 5,
                tti: 0,
                ttf: 2,
            })
        } else if (e instanceof dna.Scoop && e.test(x, this.w)) {
            let ore = Math.round(lib.math.linear(env.meteorMinOre, env.meteorMaxOre, lib.math.rndf()))
            lab.score.addOre(ore)
            sys.spawn('text/fadeText', {
                font: '24px zekton',
                fillStyle: '#f04000',
                x: lab.camera.screenX(this.x),
                y: lab.camera.screenY(this.y) - 50,
                text: '+' + ore + ' Ore',
                dx: 20,
                dy: -30,
                ttl: 5,
                tti: 0,
                ttf: 2,
            })
        } else if (e instanceof dna.Gun && x > e.x-e.w && x < e.x+e.w) {
            env.ore = Math.floor(env.ore/2)
        }
    })

    this.__.detach(this)
}

Meteor.prototype.evo = function(dt) {
    this.x += this.dx * dt
    this.y += this.dy * dt

    if (this.y > 0) this.ground()
}

Meteor.prototype.draw = function(dt) {
	ctx.save()
	ctx.translate(this.x, this.y)
    ctx.drawImage(res.capsule, -this.w/2, -this.h/2, this.w, this.h)
	ctx.restore()
}

module.exports = Meteor

