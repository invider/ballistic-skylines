let Gun = function(st) {
    this.w = 64
    this.h = 64

    sys.augment(this, st)
}

Gun.prototype.evo = function(dt) {
}

Gun.prototype.draw = function() {
    ctx.save()
    ctx.translate(this.x - this.w/2, this.y - this.h/2)

    ctx.fillStyle = '#700090'
    ctx.fillRect(0, 0, this.w, this.h)

    ctx.restore()
}

module.exports = Gun
