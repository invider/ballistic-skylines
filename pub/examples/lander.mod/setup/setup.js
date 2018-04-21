module.exports = function createLander() {
    log.debug('setup', 'setting up the game...')
    sys.spawn('lander')
    trap('start')
}
