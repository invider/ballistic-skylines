var STEP_TIME = 0.25
//var TILEX = 90
var TILEX = 340

module.exports = {
    Z: 101,

    x: 5,
    y: 5,
    st: 0,
    dir: 0,
    bir: 0,

    init: function() {
        // map tiles
        this.tilex = TILEX
    },

    move: function(dir) {
        if (this.dir != dir) this.st = 0
        this.dir = dir
    },

    build: function(bir) {
        this.bir = bir
    },

    stop: function() {
        this.dir = 0
    },

    evo: function(dt) {
        if (this.dir > 0) {
            this.st -= dt
            if (this.st <= 0)  {
                this.st = STEP_TIME
                lab.landscape.turn()
            }
        } else if (this.bir > 0) {
            lab.landscape.turn()
        }
    },

    next: function() {
        if (this.dir > 0) {
            switch (this.dir) {
            case 1:
                this.x--;
                this.tx = this.x - 1
                this.ty = this.y
                break;
            case 2:
                this.y--;
                this.tx = this.x
                this.ty = this.y - 1
                break;
            case 3:
                this.x++;
                this.tx = this.x + 1
                this.ty = this.y
                break;
            case 4:
                this.y++;
                this.tx = this.x
                this.ty = this.y + 1
                break;
            }
        } else if (this.bir > 0) {
            let type = 1

            switch (this.bir) {
            case 1:
                lab.landscape.build(this.x-1, this.y, type, 100)
                break;
            case 2:
                lab.landscape.build(this.x, this.y-1, type, 100)
                break;
            case 3:
                lab.landscape.build(this.x+1, this.y, type, 100)
                break;
            case 4:
                lab.landscape.build(this.x, this.y+1, type, 100)
                break;
            }
            this.bir = 0
        }
    },

    use: function() {
        lab.landscape.turn()
    },


    draw: function(dt) {
        let step = lab.landscape.step
        let sx = lab.landscape.absX(this.x)
        let sy = lab.landscape.absY(this.y)
        res.tiles.draw(this.tilex, sx, sy, step, step)
    },
}
