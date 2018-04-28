function showVolume() {
    sys.spawn('text/fadeText', {
        font: '24px zekton',
        fillStyle: '#f01020',
        x: ctx.width * 0.6,
        y: ctx.height * 0.3,
        text: 'Volume: ' + Math.round(env.sfxVolume * 100) + '%',
        dx: 50,
        dy: -70,
        ttl: 2,
        tti: 0.3,
        ttf: 1,
    })
    lib.sfx(res.sfx.powerup, 1)
}

let VL = 0.5
let volumeControl = 0
let volumeUp = false
let volumeDown = false

module.exports = {
    Z: 100,

    init: function() {
        env.sfxVolume = 0.7
    },

    volumeUp: function(val) {
        volumeUp = val
    },

    volumeDown: function(val) {
        volumeDown = val
    },

    evo: function(dt) {
        if (volumeUp) volumeControl += dt
        else if (volumeDown) volumeControl -= dt
        
        if (volumeControl < -VL) {
            if (env.sfxVolume > 0) {
                env.sfxVolume = Math.max((env.sfxVolume*10 - 1)/10, 0)
                showVolume()
            }
            volumeControl = 0
        } else if (volumeControl > VL) {
            if (env.sfxVolume < 1) {
                env.sfxVolume = Math.min((env.sfxVolume*10 + 1)/10, 1)
                showVolume()
            }
            volumeControl = 0
        }
    },

    draw: function() {

        ctx.fillStyle = '#00002550'
        ctx.fillRect(0, ctx.height-110, ctx.width, 110)

        let type = lab.gun.capsuleType.value()
        let msg = '' + type.label + ' [' + type.ore + ' ore]'

        ctx.imageSmoothingEnabled = false
        ctx.drawImage(res[type.pre + 'capsule'],
            ctx.width/2 - 16,
            ctx.height-90,
            32, 32)

        ctx.fillStyle = '#ff8000'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'bottom'
        ctx.font = '24px zekton'
        ctx.fillText(msg, ctx.width/2, ctx.height-20)
    }
}
