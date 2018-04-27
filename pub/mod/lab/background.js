let STAR_FQ = 1.6
let METEOR_FQ = 0.3

// star background
module.exports =  {
    Z: -1,

    stars: [],

    newStar: function(falling) {
        let star = {
            a: true,
            falling: falling,
            c: lib.math.rndi(3),
            x: env.width,
            y: lib.math.rndi(env.height*2) - env.height,
            s: 4 + lib.math.rndi(8),
            hs: 2 + lib.math.rndi(3),
            m: 5 + lib.math.rndi(10),
        }
        if (falling) {
            star = {
                a: true,
                falling: falling,
                c: lib.math.rndi(3),
                x: lib.math.rndi(env.width*2),
                y: -20,
                dx: -150 - lib.math.rndi(150),
                dy: 300 + lib.math.rndi(300),
                m: 4 + lib.math.rndi(5),
            }
        }

        // place the star
        for (let i = 0; i < this.stars.length; i++) {
            if (!this.stars[i].a) {
                this.stars[i] = star
                return
            }
        }
        this.stars.push(star)
    },

    spawn: function() {
        // make sure the stars fill the whole sky in the beginning
        for(let i = 0; i < ctx.width/4; i++) {
            this.evo(1)
        }
    },

    evo: function(dt) {
        if (lib.math.rndf() < STAR_FQ * dt) this.newStar(false)
        if (lib.math.rndf() < METEOR_FQ * dt) this.newStar(true)

        // move stars
        this.stars.forEach( star => {
            if (star.falling) {
                star.x += star.dx * dt
                star.y += star.dy * dt
                if (star.y > env.height) star.a = false
            } else {
                star.x -= star.s * dt
                star.y += star.hs * dt
                if (star.x < 0) star.a = false
            }
        })
    },

    draw: function() {
        // clear the screen
        ctx.fillStyle = "#250535"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // draw stars
        this.stars.forEach( star => {
            let img = res['star-blue']
            switch(star.c) {
            case 0: img = res['star-red']; break;
            case 1: img = res['star-blue']; break;
            case 2: img = res['star-yellow']; break;
            }
            ctx.drawImage(img, star.x, star.y, star.m, star.m)
        })
    },
};

