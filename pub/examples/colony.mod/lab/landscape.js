'strict mode'
module.exports = {
    Z: 0,

    x: -100,
    y: -50,
    step: 64,

    probe: function(l, x, y) {
        if (x < 0 || x >= this.w
            || y < 0 || y >= this.h) return 0

        let val = 0
        switch(l) {
        case 0: val = this.map[y*this.w + x]; break;
        case 1: val = this.plan[y*this.w + x]; break;
        case 2: val = this.prop[y*this.w + x]; break;
        case 3: val = this.val[y*this.w + x]; break;
        }

        if (val === undefined) return 0
        return val
    },

    plain: function(x, y) {
        if (this.probe(0, x, y) < env.tilex.PLAIN) return false
        if (this.probe(1, x, y) > 0) return false
        return true
    },

    form: function(x, y, land) {
        if (x < 0 || y < 0 || x >= this.w || y >= this.h) return
        this.map[y*this.w + x] = land
    },

    build: function(x, y, land, val) {
        if (x < 0 || y < 0 || x >= this.w || y >= this.h) return
        this.plan[y*this.w + x] = land
        if (val) {
            this.val[y*this.w + x] = val
        }
    },

    genesis: function(w, h) {
        this.w = w
        this.h = h
        this.map = []
        this.plan = []
        this.prop = []
        this.val = []

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                let sh = y*w + x
                this.map[sh] = 1 + lib.math.rndi(10)
                this.plan[sh] = 0
            }
        }
    },

    init: function() {
        // generate the world
        this.genesis(env.planet.width, env.planet.height)
    },

    turn: function() {
        lab._ls.forEach(a => { if (a.next) a.next() })
    },

    evo: function(dt) {
        this.x = lab.hero.x * this.step - ctx.width/2 + this.step/2
        this.y = lab.hero.y * this.step - ctx.height/2 + this.step/2
    },

    absX: function(x) {
        return x*this.step - this.x
    },

    absY: function(y) {
        return y*this.step - this.y
    },

    cellX: function(x) {
        return Math.floor(x / this.step)
    },
    
    cellY: function(y) {
        return Math.floor(y / this.step)
    },

    landTilex: function(ix) {
        let val = env.tilex.land[ix]
        if (val === undefined) val = env.tilex.land[0]
        return val
    },

    planTilex: function(ix) {
        let val = env.tilex.plan[ix]
        if (val === undefined) val = env.tilex.plan[0]
        return val
    },

    propTilex: function(ix) {
        let val = env.tilex.prop[ix]
        if (val === undefined) val = env.tilex.prop[0]
        return val
    },

    draw: function() {
        // draw background
        ctx.fillStyle = '#151020'
        ctx.fillRect(0, 0, ctx.width, ctx.height)

        ctx.imageSmoothingEnabled = false

        let w = this.step
        let tw = Math.ceil(ctx.width/w)
        let th = Math.ceil(ctx.height/w)

        let bx = this.cellX(this.x)
        let by = this.cellY(this.y)
        let cx = this.absX(bx)
        let cy = this.absY(by)

        for (let j = 0; j < th; j++) {
            for (let i = 0; i < tw; i++) {
                let px = bx + i
                let py = by + j

                let t = this.landTilex(this.probe(0, px, py))
                res.tiles.draw(t, cx + i*w, cy + j*w, w, w)

                let plan = this.probe(1, px, py)
                let prop = this.probe(2, px, py)

                if (plan != 0) res.tiles.draw(this.planTilex(plan), ctx, cx + i*w, cy + j*w, w, w)
                if (prop != 0) res.tiles.draw(this.propTilex(prop), ctx, cx + i*w, cy + j*w, w, w)
            }
        }
    },
}
