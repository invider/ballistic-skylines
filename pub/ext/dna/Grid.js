let Grid = function(dat) {
    this.color = '#40ff00'
    this.font = '14px zekton'
    this.step = 50

    sys.augment(this, dat)

    if (this.x1 === undefined) {
        if (this.top === undefined) {
            this.top = 1000
        }
        this.x1 = -this.top
        this.x2 = this.top
        this.y1 = -this.top
        this.y2 = this.top
    }

    if (this.style === 'grid') {
        this.mark = function(x, y) {
            let r = this.step/2
            ctx.beginPath()
            ctx.moveTo(x-r,y)
            ctx.lineTo(x+r,y)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(x,y-r)
            ctx.lineTo(x,y+r)
            ctx.stroke();
        }
    } else if (this.style === 'target') {
        this.mark = function(x, y) {
            let r = this.step/5
            ctx.beginPath()
            ctx.moveTo(x-r,y)
            ctx.lineTo(x+r,y)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(x,y-r)
            ctx.lineTo(x,y+r)
            ctx.stroke();
        }
    }
}

Grid.prototype.coord = function(x, y) {
    if (this.coordinates) {
        ctx.font = this.font
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        ctx.fillText('' + x + 'x' + y, x+5, y+2)
    }
}

Grid.prototype.mark = function(x, y) {
    ctx.fillRect(x-1, y-1, 2, 2)
}

Grid.prototype.draw = function() {
    ctx.fillStyle = this.color
    ctx.strokeStyle = this.color

    for (let y = this.y1; y <= this.y2; y += this.step) {
        for (let x = this.x1; x <= this.x2; x += this.step) {
            this.mark(x, y)
            this.coord(x, y)
        }
    }
}

module.exports = Grid
