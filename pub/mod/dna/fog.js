module.exports = function(st) {

    let EDGE = 256
    let MAX_FQ = 15
    let FOG_PERIOD = 740
    let FOG_CAP = 0.3

    let FOG_MIN = 80
    let FOG_LEVEL = 128 

    let timer = FOG_PERIOD/2
    let emit = 0

    return {

        Z: 10000000,

        FOG_FQ: 0, 

        particles: [], // plumes

        makeItFog: function() {
            timer = 0
        },

        newParticle: function() {
            let particle = {
                a: true,
                x: lab.camera.worldX(-EDGE),
                y: - FOG_MIN - lib.math.rndi(FOG_LEVEL),
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
            if (env.noAtmosphericEffects) return

            timer += dt

            // calculate intencity
            let fogFactor = Math.max(Math.cos((timer/FOG_PERIOD)*Math.PI*2) - (1-FOG_CAP), 0)/FOG_CAP
            this.FOG_FQ = fogFactor * MAX_FQ

            // generate plumes
            emit += this.FOG_FQ*dt
            while (emit >= 1) {
                this.newParticle()
                emit--
            }

            // make it fog
            this.particles.forEach( p => {
                p.x += p.dx * dt
                p.y += p.dy * dt
                if (p.x > lab.camera.worldX(ctx.width+EDGE)) p.a = false
            })
        },

        draw: function() {
            if (env.noAtmosphericEffects) return
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
}
