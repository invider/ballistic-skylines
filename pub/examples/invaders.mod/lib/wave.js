function spawn(x, y) {
    sys.spawn('Invader', {
        x: x,
        y: y,
    })
}

module.exports = {
    newWave: function() {
        env.wave ++

        let step = 80
        let row = 8
        let bx = (ctx.width - (row*step))/2
        let by = 50

        for (let i = 0; i < row; i++) {
            spawn(bx + i*step, by)
        }
    }
}
