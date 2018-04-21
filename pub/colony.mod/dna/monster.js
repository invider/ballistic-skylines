var Monster = function(dat) {
    this.type = 101
    if (dat && dat.x) {
        this.x = dat.x
        this.y = dat.y
    } else {
        this.x = lib.math.rndi(env.planet.width)
        this.y = lib.math.rndi(env.planet.height)
    }

    this.type = lib.math.rndi(env.monster.length)
    // augment with tuning values from env/monster
    sys.augment(this, env.monster[this.type])
}

Monster.Z = 103

Monster.prototype.move = function(dir) {
    switch (dir) {
    case 1:
        if (lab.landscape.plain(this.x-1, this.y)) this.x--;
        break;
    case 2:
        if (lab.landscape.plain(this.x, this.y-1)) this.y--;
        break;
    case 3:
        if (lab.landscape.plain(this.x+1, this.y)) this.x++;
        break;
    case 4:
        if (lab.landscape.plain(this.x, this.y+1)) this.y++;
        break;
    }
}

Monster.prototype.next = function() {
    let dir = lib.math.rndi(4) + 1
    this.move(dir)
}

Monster.prototype.draw = function() {
        let step = lab.landscape.step
        let sx = lab.landscape.absX(this.x)
        let sy = lab.landscape.absY(this.y)
        res.tiles.draw(this.tilex, ctx, sx, sy, step, step)
}

module.exports = function(dat) {
    return new Monster(dat)
}
