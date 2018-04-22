
let FQ = 2
let timer = 0

module.exports = {

    init: function() {
        env.population = 0
    },

    evo: function(dt) {
        timer += dt
        if (timer < FQ) return

        let blocks = 0
        lab.camera._ls.forEach(e => {
            if (e instanceof dna.Building) {
                blocks += e.floor
            }
        })
        env.population = blocks * env.tuning.sectionPopulation
    },

    draw: function() {
        let msg = 'Population: '
        if (env.population > 1000000) {
            msg += Math.round(env.population/100000)/10 + 'K'
        } else if (env.population > 1000) {
            msg += Math.round(env.population/100)/10 + 'K'
        } else {
            msg += env.population
        }

        ctx.font = '28px zekton'
        ctx.fillStyle = '#F0A000'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        ctx.fillText(msg, ctx.width * 0.8, 10)
    }
}
