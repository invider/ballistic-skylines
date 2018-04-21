
let STAR_FQ = 2

// star background
return {
    Z: 1,
    stars: [],

    newStar: function() {
        let star = {
            a: true,
            c: lib.math.rndi(3),
            x: lib.math.rndi(ctx.width),
            y: ctx.height + 20,
            s: 10 + lib.math.rndi(20),
            m: 3 + lib.math.rndi(15),
        }

        for (let i = 0; i < this.stars.length; i++) {
            if (!this.stars[i].a) {
                this.stars[i] = star
                return
            }
        }

        this.stars.push(star)
    },

    spawn: function() {
        for(let i = 0; i < 60*60; i++) {
            this.evo(0.015)
        }
    },

    evo: function(dt) {
        if (lib.math.rndf() < STAR_FQ * dt) this.newStar()

        // move stars
        let speed = 10
        if (lab.lander) speed = lab.lander.speed
        this.stars.forEach( star => {
            star.y -= star.s * dt * (speed/10)
            if (star.y < 0) star.a = false
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
            case 0: img = res['star-blue']; break;
            case 1: img = res['star-yellow']; break;
            case 2: img = res['star-red']; break;
            }
            ctx.drawImage(img, star.x, star.y, star.m, star.m)
        })
    },
};

