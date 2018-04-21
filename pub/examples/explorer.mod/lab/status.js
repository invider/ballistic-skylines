module.exports = {
    draw: function() {
        ctx.fillStyle = '#80F000'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'bottom'
        ctx.font = '18px zekton'

        let text = env.status
        if (!text) text = 'status'
        ctx.fillText(text, 10, ctx.height-10)
    }
}
