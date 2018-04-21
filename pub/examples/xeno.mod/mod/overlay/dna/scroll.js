module.exports = function(init) {

    // construct and return scrolling text
    return {
        timer: 0,
        line: 0,

        rx: init.rx,
        ry: init.ry,
        txt: init.txt,
        period: init.period,
        time: init.time,
        fadein: init.fadein,
        fadeout: init.fadeout,
        speed: init.speed,
        font: init.font,
        color: init.color,

        init: function() {
            if (!this.txt) this.txt = 'text is missing'
            this.txt = this.txt.split(/\r?\n/)
        },

        spawnLine: function(msg) {
            sys.spawn('fadeText', {
                rx: this.rx,
                ry: this.ry,
                text: msg,
                font: this.font,
                fillStyle: this.color,
                textAlign: 'center',
                ttl: this.time,
                tti: this.fadein,
                ttf: this.fadeout,
                dy: this.speed,
            })
        },

        evo: function(dt) {
            this.timer -= dt

            if (this.timer < 0) {
                this.timer = this.period
                this.spawnLine(this.txt[this.line++])
            }

            if (this.line >= this.txt.length) {
                this.__.detach(this)
            }
        },
    }
}
