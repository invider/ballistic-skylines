module.exports = {
    draw: function() {
        ctx.fillStyle = '#ffff00'
        ctx.textBaseline = 'bottom'
        ctx.font = '24px zekton'
        ctx.fillText(env.status, 20, ctx.height-20)
    }
}
