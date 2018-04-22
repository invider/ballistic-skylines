module.exports = function() {
    log.out('setting up the scene')

    env.worldStart = -1500
    env.worldEnd = 1500
    sys.augment(env, env.tuning)

    // spawn camera
    sys.spawn('SlideCamera', {
        name: 'camera',
        Z: 10,
        x: 0,
        y: -ctx.height/4,
        keys: [],
    })

    sys.spawn('landscape', {}, 'camera')

    // spawn a gun under the camera
    sys.spawn('Gun', {
        Z: 1000000,
        x: 0,
        y: -16,
    }, 'camera')
    lab.gun = lab.camera.gun

    // spawn a scoop
    sys.spawn('Scoop', {
        x: -300,
        y: -6,
    }, 'camera')
    lab.gun = lab.camera.gun

    /*
    // spawn world coordinate grid
    sys.spawn('Grid', {
        color: '#ff7080',
        top: 1000,
        step: 100,
        coordinates: true,
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
    */
    env.status = 'build'
}
