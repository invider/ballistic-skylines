module.exports = function() {
    // setting up the game

    sys.spawn('Ship', {
        name: 'ship',
    })

    env.wave = 0
    lib.wave.newWave()
}
