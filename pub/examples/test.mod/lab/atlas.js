module.exports = {
    draw: function() {

        let tx = 8
        let W = 64

        for (let j = 0; j < 12; j++) {
            for (let i = 0; i < 17; i++) {
                res.tileset.draw(tx++, ctx, i*W, j*W, W, W)
            }
        }
    }

}
