module.exports = function() {
    log.out('setting up the scene')

    // spawn camera
    sys.spawn('SlideCamera', {
        name: 'camera',
        x: 0,
        y: -ctx.height/4,
        keys: [],
    })

    sys.spawn('landscape', {}, 'camera')

    // spawn a gun under the camera
    sys.spawn('Gun', {
        x: 0,
        y: 0,
    }, 'camera')

    // spawn world coordinate grid
    sys.spawn('Grid', {
        color: '#ff7080',
        top: 1000,
        step: 100,
        coordinates: false,
    }, 'camera')

    // spawn camera + marks
    sys.spawn('Grid', {
        color: '#505050',
        x1: 0,
        x2: ctx.width + 100,
        y1: 0,
        y2: ctx.height,
        step: ctx.width/7,
        style: 'target',
    })
}