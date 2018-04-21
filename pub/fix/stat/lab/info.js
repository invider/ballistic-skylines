return {
    time: 0,
    fps: 50,
    last: 0,
    smoothing: 0.99,

    init: function() {
        console.log('------------- attached point: ' + this.__.path())
        console.dir(_)
        this.last = Date.now()
    },
    evo: function(dt) {
        this.time += dt
    },
    draw: function() {
        let t = Date.now()
        let d = (t - this.last)/1000
        let f = 1/d
        this.fps = (this.fps * this.smoothing) + (f * (1-this.smoothing))

        ctx.fillStyle = '#FFFF00'
        ctx.font = '24px zekton'
        ctx.fillText('FPS: ' + Math.round(this.fps), 10, 42) 
        ctx.fillText('Time: ' + Math.floor(this.time), 10, 72)

        this.last = t
    },
}
