module.exports = function(e) {
    lab.lander.tune()
    lab.panel.reset()
    lab.space.spawn()
    lib.sfx(res.sfx.start, 0.3)
}
