let mv = []

let Gun = function(st) {
    this.w = 64
    this.h = 64
    this.name = 'gun'

    sys.augment(this, st)

    this.angle = 1
}

Gun.prototype.charge = function() {
}

Gun.prototype.fire = function() {
}

Gun.prototype.move = function(dir) {
    mv[dir] = true
}

Gun.prototype.stop = function(dir) {
    mv[dir] = false
}

Gun.prototype.next = function(dir) {
    // next weapon type
}

Gun.prototype.prev = function(dir) {
    // prev weapon type
}

Gun.prototype.evo = function(dt) {
    if (mv[1]) {
        this.angle += 0.5 * dt
    } else if (mv[2]) {
        this.angle -= 0.5 * dt
    }
}

Gun.prototype.draw = function() {
    ctx.save()
    ctx.translate(this.x - this.w/2, this.y - this.h/2)

    ctx.fillStyle = '#700090'
    ctx.fillRect(0, 0, this.w, this.h)

    ctx.restore()
}

module.exports = Gun
