let Sprite = function(dat) {
    this.alive = true
    this.x = ctx.width/2
    this.y = ctx.height/2
    this.dx = 0
    this.dy = 0
    this.startTilex = 0
    this.endTilex = 0
    this.framerate = 1

    sys.augment(this, dat)

    this.tilexTime = 0
    this.tilex = this.startTilex
    this.tilexPeriod = 1/this.framerate
}

Sprite.prototype.move = function(dt) {
    this.x += this.dx * dt
    this.y += this.dy * dt
}

Sprite.prototype.nextFrame = function(dt) {
    if (this.framerate > 0) {
        this.tilexTime += dt
        if (this.tilexTime > this.tilexPeriod) {
            this.tilexTime -= this.tilexPeriod
            this.tilex ++
            if (this.tilex > this.endTilex) {
                this.tilex = this.startTilex
            }
        }
    }
}

Sprite.prototype.evo = function(dt) {
    this.move(dt)
    this.nextFrame(dt)
}

Sprite.prototype.draw = function() {
    ctx.save()
    ctx.translate(this.x-this.w/2, this.y-this.h/2)

    if (this.img) {
        ctx.drawImage(this.img, 0, 0, this.w, this.h)
    } else if (this.tiles) {
        if (sys.isArray(this.tiles)) {
            ctx.drawImage(this.tiles[this.tilex],
                0, 0, this.w, this.h)
        } else {
            this.tiles.draw(this.tilex, 0, 0, this.w, this.h)
        }
    }
    // debug - draw border frame
    //ctx.strokeStyle = '#00ff00'
    //ctx.strokeRect(0, 0, this.w, this.h)
    ctx.restore()
}

module.exports = Sprite
