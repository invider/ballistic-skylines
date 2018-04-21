module.exports = function(init) {
    return {
        Z: 10,
        name: 'lander',
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        angle: 0,
        speed: 0,
        altitude: 0,
        flames: [],

        tune: function() {
            this.altitude = env.tuning.alt
            this.speed = env.tuning.speed
            this.angle = 0
        },

        spawn: function() {
            this.tune()
            this.x = ctx.width/2
            this.y = ctx.height/2
            this.jet()
        },

        jet: function() {
            // x, y, lifespan, force,
            //size, vsize, speed, vspeed,
            //startAngle, spread, minLifespan, vLifespan) {
            let fc = this.flames.reduce((a, c) => { if (c.alive) a++ }, 0)
            if (fc === 0) this.flames = []

            this.flames.push(new dna.Explosion(
                -36, 55, // x, y
                1.5, 300,
                7, 7,
                120, 0,
                Math.PI/2-0.2, 0.4,
                0.6, 0.4
            ))
            this.flames.push(new dna.Explosion(
                36, 55, // x, y
                1.5, 300,
                7, 7,
                120, 0,
                Math.PI/2-0.2, 0.4,
                0.6, 0.4
            ))
            lib.sfx(res.sfx.burn, 0.8)
        },

        burn: function(val) {
            this.speed -= val
            if (this.speed < 1) this.speed = 1
            this.jet()
        },

        evo: function(dt) {
            if (this.altitude > 0) {
                this.altitude -= this.speed * dt
                this.speed += env.tuning.gravity * dt
                if (this.altitude <= 0) {
                    // landed!
                    let landingSpeed = this.speed
                    this.speed = 0
                    this.altitude = 0
                    if (landingSpeed > env.tuning.redSpeed) {
                        this.angle = Math.PI * 0.7
                        lib.sfx(res.sfx.crash, 1)
                    } else if (landingSpeed > env.tuning.yellowSpeed) {
                        this.angle = -Math.PI/5
                        lib.sfx(res.sfx.harsh, 1)
                    } else {
                        this.angle = 0
                        lib.sfx(res.sfx.landing, 1)
                    }
                    trap('touchdown', landingSpeed)
                }
            }
            this.flames.forEach(f => f.evo(dt))
        },

        draw: function() {
            ctx.save()
            ctx.translate(this.x, this.y)
            ctx.rotate(this.angle)
            ctx.imageSmoothingEnabled = false
            ctx.drawImage(this._.res.lander, -this.w/2, -this.h/2, this.w, this.h)
            //ctx.fillStyle = '#ff0000'
            //ctx.fillRect(0, 0, this.w, this.h)
            this.flames.forEach(f => f.draw())
            ctx.restore()
        },
    }
}
