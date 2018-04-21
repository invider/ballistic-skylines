module.exports = function(e) {

    let tx = lab.camera.worldX(e.x)
    let ty = lab.camera.worldY(e.y)
    let sx = lab.camera.screenX(tx)
    let sy = lab.camera.screenY(ty)

    env.status = '' + e.x + 'x' + e.y + ' -> '
        + Math.round(tx) + 'x'
        + Math.round(ty)
        + ' -> '
        + Math.round(sx) + 'x'
        + Math.round(sy)

    lab.camera.target = {
        x: tx,
        y: ty,
    }

    let dat = {
        x: tx,
        y: ty,
        color: '#FF0000',
    }
    let t = lib.math.rndi(4)

    switch(t) {
    // test default
    case 0: break;

    // small sun
    case 1: dat = sys.augment(dat, {
            lifespan: 10,
            force: 100,
            size: 6, vsize: 4,
            speed: 20, vspeed: 0,
            angle: Math.PI,
            spread: Math.PI/2,
            minLifespan: 1,
            vLifespan: 0
        })
        break;

    // water stream
    case 2: dat = sys.augment(dat, {
            color: '#4010D0',
            lifespan: 10,
            force: 500, // particles/second
            size: 4, vsize: 4,
            speed: 50, vspeed: 40,
            angle: Math.PI + 2,
            spread: Math.PI/6,
            minLifespan: 6,
            vLifespan: 0,
            moveParticle: function(dt) {
                this.x += this.dx * dt
                this.y += this.dy * dt
                this.dy += 15*dt
                if (this.dx > 0) {
                    this.dx -= 7*dt
                    if (this.dx < 0) this.dx = 0
                }
                if (this.dx < 0) {
                    this.dx += 5*dt
                    if (this.dx > 0) this.dx = 0
                }
            },
            drawParticle: function() {
                if (this.lifespan < 0.5) {
                    ctx.globalAlpha = this.lifespan/0.5
                } else {
                    ctx.globalAlpha = 1
                }
                ctx.fillStyle = this.color
                ctx.fillRect(this.x, this.y, this.r, this.r)
            },
            /*
            onExhausted: function() {
                this.alive = false
            },
            */
        })
        break;

        // smoke explosion
        case 3: dat = sys.augment(dat, {
            img: res['smoke-particle'],
            lifespan: 1,
            force: 200,
            size: 15, vsize: 15,
            speed: 20, vspeed: 0,
            angle: 0,
            spread: Math.PI*2,
            minLifespan: 1,
            vLifespan: 1 
        })
        break;
    }

    sys.spawn('Emitter', dat, 'camera')
}
