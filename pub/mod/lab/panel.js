module.exports = {
    Z: 100,
    draw: function() {
        let type = lab.gun.capsuleType.value()
        let msg = '' + type.label + ' [' + type.ore + ' ore]'

        ctx.fillStyle = '#ff8000'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'bottom'
        ctx.font = '24px zekton'
        ctx.fillText(msg, ctx.width/2, ctx.height-20)
    }
}
