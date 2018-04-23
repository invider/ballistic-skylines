module.exports = function() {

   return {
        Z: 0,

        apply: function(x, w, fn) {
            let res = []
            lab.camera._ls.forEach(e => {
                if (e.type > 0 && e.type < 10) {
                    // some kind of construction on the ground
                    if (e.x-e.w/2 < x+w/2 && e.x+e.w/2 > x-w/2) {
                        if (fn) fn(e, res)
                        else res.push(e)
                    }
                }
            })
            return res
        },

        draw: function() {
            ctx.fillStyle = '#252030'
            ctx.fillRect(env.worldStart, 0, env.worldEnd - env.worldStart, 500)

            ctx.strokeStyle = '#600090'
            ctx.lineWidth = 4
            ctx.beginPath()
            ctx.moveTo(env.worldStart,0)
            ctx.lineTo(env.worldEnd,0)
            ctx.stroke()
        }
   }

}

