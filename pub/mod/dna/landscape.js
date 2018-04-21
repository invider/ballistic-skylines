module.exports = function() {
   return {
        Z: 0,
        draw: function() {
            ctx.strokeStyle = '#600090'
            ctx.lineWidth = 4
            ctx.beginPath()
            ctx.moveTo(-1000,0)
            ctx.lineTo(1000,0)
            ctx.stroke()
        }
   }
}

