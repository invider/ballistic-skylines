
let EDGE = 256
let MAX_FQ = 250
let FOG_PERIOD = 120
let FOG_CAP = 100 // the more is value, the less foggy it gets 
let timer = 60
let emit = 0

module.exports = {

    Z: 5000,

    FOG_FQ: 10, 

    particles: [],

    newParticle: function() {

        let particle = {
            a: true,
            x: -EDGE,
            y: -32 + lib.math.rndi(ctx.height/7),
            dx: 10 + lib.math.rndi(40),
            dy: 0,
            w: 32 + lib.math.rndi(128),
        }

        // place the drop
        for (let i = 0; i < this.particles.length; i++) {
            if (!this.particles[i].a) {
                this.particles[i] = particle
                return
            }
        }
        this.particles.push(particle)
    },

    evo: function(dt) {
        timer += dt

        /*
        // calculate rain intencity
        this.DROP_FQ = Math.max((MAX_FQ+RAIN_CAP) * Math.sin(
            (timer/RAIN_PERIOD)*Math.PI*2) - RAIN_CAP, 0)
        */

        // generate drops
        emit += this.FOG_FQ*dt
        while (emit >= 1) {
            this.newParticle()
            emit--
        }

        // make it rain
        this.particles.forEach( p => {
            p.x += p.dx * dt
            p.y += p.dy * dt
            if (p.x > ctx.width+EDGE) p.a = false
        })
    },

    draw: function() {
        // draw drops
        ctx.save()
        ctx.globalAlpha=0.1;
        ctx.imageSmoothingEnabled = true

        this.particles.forEach( p => {
            ctx.drawImage(res.dustParticle, p.x, p.y, p.w, p.w)
        })

        ctx.restore()
    },
}
