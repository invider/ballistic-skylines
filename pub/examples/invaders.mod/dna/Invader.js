let Invader = function(dat) {
    this.type = 3

    this.tiles = res.invader

    dna.Sprite.call(this, dat)

    this.startTilex = 0
    this.endTilex = 1
    this.framerate = 1.5
    this.tilexPeriod = 1/this.framerate
    this.w = 64
    this.h = 64
    this.r = this.w/2
}
Invader.prototype = new dna.Sprite()

Invader.prototype.kill = function() {
    this.__.detach(this)
}


module.exports = Invader
