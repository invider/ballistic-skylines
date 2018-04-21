
let instances = 0

let Button = function(id) {
    instances ++
    if (!id) id = {}

    if (id.name) this.name = id.name
    else this.name = 'Button ' + instances
    if (id.x) this.x = id.x
    else this.x = 0
    if (id.y) this.y = id.y
    else this.y = 0
    if (id.text) this.text = id.text
    else this.text = this.name

    this.color = '#FF0090'
    this.bcolor = '#404040'
    this.pcolor = '#202020'
    this.hspace = 5
    this.vspace = 5
    this.font = '24px Impact'
    this.fontHeight = 24
}

Button.prototype.evo = function() {}

Button.prototype.size = function() {
    ctx.font = this.font
    let m = ctx.measureText(this.text)
    return {
        w: m.width + this.hspace*2,
        h: this.fontHeight + this.vspace*2,
    };
}

Button.prototype.draw = function() {
    let s = this.size()
    ctx.fillStyle = this.bcolor
    ctx.fillRect(this.x, this.y, s.w, s.h)

    ctx.fillStyle = this.color
    ctx.font = this.font
    ctx.textBaseline = 'top'
    ctx.textAlign = "left"
    ctx.fillText(this.text, this.x + this.hspace, this.y + this.vspace);
}

return Button
