let Rubbish = function(st) {
    this.type = 4
    this.Z = env.Z++

    sys.augment(this, st)

    this.w = 64
    this.h = 32
    this.y = -17
}

Rubbish.prototype.draw = function() {
	ctx.save()
	ctx.translate(this.x, this.y)

    ctx.drawImage(res.rubbish, -this.w/2, -this.h/2, this.w, this.h)
	ctx.restore()
}

Rubbish.prototype.destroy = function() {
    this.__.detach(this)
}

module.exports = Rubbish
