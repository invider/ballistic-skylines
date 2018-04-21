var SIZE = 100

module.exports = {

    target: 0,
    showed: 1,

    forward: function() {
        this.target += this.showed
    },

    prev: function() {
        this.target -= this.showed
        if (this.taret < 0) this.target = 0
    },

    draw: function() {
        let sx = 0
        let sy = ctx.height - SIZE
        let t = 0

        ctx.fillStyle = '#101010A0'
        ctx.fillRect(sx, sy-24, ctx.width, SIZE+24)

        ctx.fillStyle = '#FFFF00'
        ctx.font = '24px base-font'
        
        while (sx < ctx.width) {
            let tile = this.target + t++
            res.tiles.draw(tile, sx, sy, SIZE, SIZE)
            ctx.fillText('#' + tile, sx, sy)
            sx += SIZE
        }
        this.showed = t - 1
    },
}
