module.exports = function() {
    env.noAtmosphericEffects = !!!env.noAtmosphericEffects

    let val = 'ON'
    if (env.noAtmosphericEffects) val = 'OFF'

    sys.spawn('text/fadeText', {
        font: '24px zekton',
        fillStyle: '#f01020',
        x: ctx.width * 0.6,
        y: ctx.height * 0.3,
        text: 'Atmospheric Effects: ' + val,
        dx: 50,
        dy: -70,
        ttl: 2,
        tti: 0.3,
        ttf: 1,
    })
    lib.sfx(res.sfx.powerup, 1)
}
