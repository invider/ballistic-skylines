module.exports = function() {

    lab.camera._ls.forEach(e => {
        if (e.type === 2) e.levelUp()
    })

    sys.spawn('text/fadeText', {
        font: '36px zekton',
        fillStyle: '#fff070',
        x: ctx.width/2,
        y: ctx.height * 0.6,
        align: 'center',
        base: 'middle',

        text: 'Level UP',
        dx: 0,
        dy: -80,
        ttl: 4,
        tti: 0.5,
        ttf: 2,
    })

    lib.sfx(res.sfx.levelUp, 1)
}
