
let MAX_FQ = 250
let RAIN_PERIOD = 120
let RAIN_CAP = 100 // the more is value, the less is raining
let timer = 60
let emit = 0

module.exports = {

    Z: 1000000,

    DROP_FQ: 0, 

    drops: [],

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
        timer += dt

        // calculate rain intencity
        this.DROP_FQ = Math.max((MAX_FQ+RAIN_CAP) * Math.sin(
            (timer/RAIN_PERIOD)*Math.PI*2) - RAIN_CAP, 0)

        // generate drops
        emit += this.DROP_FQ*dt
        while (emit >= 1) {
            this.newDrop()
            emit--
        }

        // make it rain
        this.drops.forEach( drop => {
            drop.x += drop.dx * dt
            drop.y += drop.dy * dt
            if (drop.y > ctx.height) drop.a = false
        })
    },

    draw: function() {
        // draw drops
        this.drops.forEach( drop => {
            ctx.drawImage(res.drop, drop.x, drop.y, drop.w, drop.h)
        })
    },
}
