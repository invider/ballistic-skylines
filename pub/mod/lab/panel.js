module.exports = {
    Z: 100,
    draw: function() {
        ctx.fillStyle = '#ffff00'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'bottom'
        ctx.font = '24px zekton'
        ctx.fillText(env.status, 20, ctx.height-20)
    }
}
