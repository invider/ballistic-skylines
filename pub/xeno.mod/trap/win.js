module.exports = function() {
    _.log.debug('==== WIN ====')

    mod._ls[0].sys.spawn('blinkingText', {
        rx: 50,
        ry: 50,
        txt: 'Mission Successful',
    })
}
