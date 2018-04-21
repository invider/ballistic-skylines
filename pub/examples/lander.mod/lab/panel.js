module.exports = {
    Z: 20,

    time: 0,
    buffer: 0,
    problem: '',
    answer: -1,
    landed: false,
    landingSpeed: 0,

    reset: function(digit) {
        this.buffer = 0
        this.landed = false
        this.nextProblem()
    },

    nextProblem: function() {
        this.buffer = 0
        // generate simple add problem for now
        let type = lib.math.rndi(2)
        let base = lib.math.rndi(5) + 1
        let next = lib.math.rndi(6) + 1

        if (type === 0) {
            this.problem = '' + base + ' + ' + next
            this.answer = base + next
        } else {
            this.problem = '' + (base+next) + ' - ' + next
            this.answer = base
        }
    },

    input: function(digit) {
        if (digit < 0) {
            this.buffer = 0
        } else {
            this.buffer = this.buffer * 10 + digit
            if (this.buffer > 1000) {
                this.buffer = digit
            }
        }
        lib.sfx(res.sfx.input, 0.8)
    },

    enter: function() {
        if (this.buffer === this.answer) {
            // got the right answer! Perform the burn
            lab.lander.burn(env.tuning.burn)
        } else {
            lib.sfx(res.sfx.powerup, 0.7)
        }
        this.nextProblem()
    },

    altColor: function(alt) {
        let color = '#20FF00'
        if (alt >= env.tuning.redAlt) color = '#FF4000'
        else if (alt >= env.tuning.yellowAlt) color = '#FFFF20'
        return color
    },

    speedColor: function(speed) {
        let color = '#20FF00'
        if (speed >= env.tuning.redSpeed) color = '#FF4000'
        else if (speed >= env.tuning.yellowSpeed) color = '#FFFF20'
        return color
    },

    evo: function(dt) {
        this.time += dt
    },

    draw: function() {
        let time = Math.floor(this.time)
        let alt = Math.floor(lab.lander.altitude)
        let speed = Math.floor(lab.lander.speed)

        // alt and speed
        ctx.textAlign = "left"
        ctx.font = '24px system'

        ctx.fillStyle = this.altColor(alt)
        ctx.fillText(env.msg.alt + ': ' + alt + 'm', 20, 50)

        ctx.fillStyle = this.speedColor(speed)
        ctx.fillText(env.msg.speed + ': ' + speed + 'm/s', 20, 90)

        ctx.fillStyle = '#40FF20'
        ctx.fillText(env.msg.time + ': ' + time + 's', 20, 130)

        // landed?
        if (this.landed) {
            let msg = env.msg.successfulLanding
            if (this.landingSpeed > env.tuning.redSpeed) msg = env.msg.crashLanding
            else if (this.landingSpeed > env.tuning.yellowSpeed) msg = env.msg.harshLanding
            ctx.textAlign = "center"
            ctx.font = '48px system'
            ctx.fillStyle = this.speedColor(this.landingSpeed)
            ctx.fillText(msg, ctx.width/2, ctx.height/3)
        } else {
            // computer
            ctx.textAlign = "center"
            ctx.font = '36px system'
            ctx.fillStyle = '#40FF20'
            let input = '?'
            if (this.buffer !== 0) input = '' + this.buffer
            ctx.fillText(this.problem + ' = ' + input, ctx.width/2, 200)
        }
    }
}
