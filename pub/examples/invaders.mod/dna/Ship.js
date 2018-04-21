let mov = []

let Ship = function(dat) {
    this.type = 1
    this.x = ctx.width/2
    this.y = ctx.height * 0.9
    this.w = 64
    this.h = 64
    this.speed = ctx.width/3

    sys.augment(this, dat)

    this.r = this.w/2
}

Ship.prototype.collide = function(e) {
}

Ship.prototype.fire = function() {
    sys.spawn('Missile', {
        tiles: res.missile,
        x: lab.ship.x,
        y: lab.ship.y - 50,
        w: 11,
        h: 30,
        dy: -ctx.height/3,
        startTilex: 0,
        endTilex: 1,
        framerate: 1.5,
    })
}

Ship.prototype.move = function(dir) {
    mov[dir] = true
}

Ship.prototype.stop = function(dir) {
    mov[dir] = false
}

Ship.prototype.evo = function(dt) {
    if (mov[1]) {
        this.x -= this.speed * dt
        if (this.x < this.w/2) this.x = this.w/2
    }
    if (mov[2]) {
        this.x += this.speed * dt
        if (this.x > ctx.width - this.w/2) this.x = ctx.width - this.w/2
    }
}

Ship.prototype.draw = function() {
    ctx.save()
    ctx.imageSmoothingEnabled = false
    ctx.translate(this.x - this.w/2, this.y - this.h/2)
    ctx.drawImage(res.ship, 0, 0, this.w, this.h)
    ctx.restore()
}

module.exports = Ship
