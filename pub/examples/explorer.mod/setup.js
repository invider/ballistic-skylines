module.exports = function() {
    log.out('setting up')

    sys.spawn('SlideCamera', {
        name: 'camera',
        x: 0,
        y: 0,
        keys: [],
    })

    // inject camera keyboard control
    sys.after(lab.camera, 'evo', function(dt) {
        if (this.keys[0]) this.x -= (this.speed/this.scale) * dt
        else if (this.keys[1]) this.y -= (this.speed/this.scale) * dt
        else if (this.keys[2]) this.x += (this.speed/this.scale) * dt
        else if (this.keys[3]) this.y += (this.speed/this.scale) * dt
    })

    sys.spawn('Tiles', {
        x: 0,
        y: 0,
        map: res.tiles,
        set: res.tileMapping,
        viewport: function() {
            return lab.camera.getViewport()
        }
    }, 'camera')

    sys.spawn('Sprite', {
        name: 'hero',
        tiles: res.sprite,
        x: 0,
        y: 0,
        w: 128,
        h: 128,
        startTilex: 0,
        endTilex: 5,
        framerate: 9,
    }, 'camera')

    sys.spawn('Grid', {
        color: '#ff7080',
        top: 1000,
        step: 100,
        coordinates: false,
    }, 'camera')

    sys.spawn('Grid', {
        color: '#505050',
        x1: 0,
        x2: ctx.width + 100,
        y1: 0,
        y2: ctx.height,
        step: ctx.width/7,
        style: 'target',
    })

    // show the story
    sys.spawn('text/scroll', {
        Z: 100,
        rx: 50,
        ry: 90,
        period: 2.5,
        time: 25,       // how long display each line
        fadein: 2.5,
        fadeout: 5,
        speed: -25,
        txt: res.story,
        font: '32px Zekton',
        color: '#60FF20',
    })
}
