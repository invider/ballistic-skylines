module.exports = function() {
    log.out('setting up overlay!!!!')

    // show the story
    sys.spawn('scroll', {
        rx: 50,
        ry: 90,
        period: 2.5,
        time: 30,       // how long display each line
        fadein: 2.5,
        fadeout: 5,
        speed: -25,
        txt: env.story,
        font: '32px Zekton',
        color: '#FFC020',
    })

};
