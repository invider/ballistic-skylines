module.exports = function() {
   return {
        Z: 0,
        draw: function() {
            ctx.strokeStyle = '#600090'
            ctx.lineWidth = 4
            ctx.beginPath()
            ctx.moveTo(env.worldStart,0)
            ctx.lineTo(env.worldEnd,0)
            ctx.stroke()
        }
   }
}

