
let MAX_FQ = 250
let RAIN_PERIOD = 240
let RAIN_CAP = 0.5
let RAIN_VOLUME = 0.3

let timer = 60
let emit = 0

module.exports = {

    Z: 1000,

    DROP_FQ: 0, 

    drops: [],

    makeItRain: function() {
        timer = 0
    },

    newDrop: function() {

        let drop = {
            a: true,
            x: lib.math.rndi(env.width),
            y: 0,
            dx: 0,
            dy: ctx.height*2,
            w: 3,
            h: 32, 
        }

        // place the drop
        for (let i = 0; i < this.drops.length; i++) {
            if (!this.drops[i].a) {
                this.drops[i] = drop
                return
            }
        }
        this.drops.push(drop)
    },

    evo: function(dt) {
        if (env.noAtmosphericEffects) {
            if (!res.sfx.rain.paused) res.sfx.rain.pause()
            return
        }
        timer += dt

        // calculate rain intencity
        let rainFactor = Math.max(Math.cos((timer/RAIN_PERIOD)*Math.PI*2) - (1-RAIN_CAP), 0)/RAIN_CAP
        this.DROP_FQ = rainFactor * MAX_FQ

        // generate drops
        emit += this.DROP_FQ*dt
        while (emit >= 1) {
            this.newDrop()
            emit--
            if (res.sfx.rain.paused) {
                //res.sfx.rain.loop = true
                res.sfx.rain.play()
            }
        }

        // make it rain
        this.drops.forEach( drop => {
            drop.x += drop.dx * dt
            drop.y += drop.dy * dt
            if (drop.y > ctx.height) drop.a = false
        })

        res.sfx.rain.volume = rainFactor * env.sfxVolume * RAIN_VOLUME
        if (!res.sfx.rain.paused && rainFactor === 0) res.sfx.rain.pause()
    },

    draw: function() {
        if (env.noAtmosphericEffects) return
        // draw drops
        this.drops.forEach( drop => {
            ctx.drawImage(res.drop, drop.x, drop.y, drop.w, drop.h)
        })
    },
}
