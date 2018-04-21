'strict mode'

let VISIBILITY_ALT= 100
let ZERO_LEVEL = 0.5

module.exports = {
    Z: 2,

    draw: function() {
        let alt = lab.lander.altitude

        if (alt < VISIBILITY_ALT) {
            let img = res.moon
            let surfaceHeight = ZERO_LEVEL * ctx.height
            let visiblePart = surfaceHeight * (1 - alt/VISIBILITY_ALT)

            ctx.drawImage(img, 0, ctx.height - visiblePart, ctx.width, surfaceHeight)
        }
    }

}
