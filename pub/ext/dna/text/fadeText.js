let FadeText = function(dat) {
    if (dat.rx) this.x = dat.rx/100 * ctx.width;
    else this.x = dat.x
    if (dat.ry) this.y = dat.ry/100 * ctx.height;
    else this.y = dat.y
    if (dat.dx) this.dx = dat.dx
    else this.dx = 0
    if (dat.dy) this.dy = dat.dy
    else this.dy = 0

    this.text = dat.text
    this.font = dat.font
    this.fillStyle = dat.fillStyle
    this.ttl = dat.ttl
    this.tti = dat.tti
    this.ttf = dat.ttf
    this.tta = this.ttl - this.ttf
    if (this.tta < 0) this.tta = 0

    this.alive = true
    this.time = 0

    this.textAlign ="left";
    if (dat.textAlign) this.textAlign = dat.textAlign
}

FadeText.prototype.evo = function(dt) {
    this.time += dt
    this.x += this.dx * dt
    this.y += this.dy * dt

    if (this.time > this.ttl) {
        this.alive = false
        this.__.detach(this)
    }
}

FadeText.prototype.draw = function() {
    if (!this.alive) return 

    if (this.time > this.tta) {
        ctx.globalAlpha = (this.ttl - this.time) / (this.ttl - this.tta)
    } else if (this.time < this.tti) {
        ctx.globalAlpha = this.time / this.tti
    } else {
        ctx.globalAlpha = 1
    }

    ctx.font = this.font
    ctx.fillStyle = this.fillStyle
    ctx.textAlign = this.textAlign

    ctx.fillText(this.text, this.x, this.y)
    ctx.globalAlpha = 1
}

module.exports = function(dat) {
    return new FadeText(dat)
}

