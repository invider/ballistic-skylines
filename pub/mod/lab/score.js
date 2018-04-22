
let FQ = 1
let timer = 0
let surplus = 0
let oreTimer = 0

module.exports = {

    Z: 100,

    init: function() {
        env.population = 0
        env.ore = 100
        env.oreIncome = 0
    },

    addOre: function(n) {
        env.oreIncome += Math.floor(n)
    },

    handleOre: function(dt) {
        if (env.oreIncome > 0) {
            oreTimer += dt
            if (oreTimer > env.oreCounter) {
                oreTimer -= env.oreCounter
                env.ore ++
                env.oreIncome --
                lib.sfx(res.sfx.pickup, 0.3)
            }
        }
    },

    handlePopulation: function(dt) {
        timer += dt
        if (timer < FQ) return
        timer -= FQ

        let blocks = 0
        lab.camera._ls.forEach(e => {
            if (e instanceof dna.Building) {
                blocks += e.floor
            }
        })
        env.populationCapacity = blocks * env.sectionCapacity
        if (env.populationCapacity > env.population) {
            if (env.population < env.populationInitialGrowth) {
                env.population++
            } else {
                surplus += env.population * env.populationGrowthFactor * lib.math.rndf()*2
                if (surplus > 1) {
                    env.population += Math.floor(surplus)
                    surplus = 0
                }
            }
        } else if (env.populationCapacity < env.population * env.populationDecreseCapacity) { 
            surplus -= env.population * env.populationGrowthFactor * lib.math.rndf()*2
            if (surplus < -1) {
                env.population += Math.floor(surplus)
                surplus = 0
            }
        }
    },

    evo: function(dt) {
        this.handleOre(dt)
        this.handlePopulation(dt)
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
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'

        ctx.fillStyle = '#F0A000'
        ctx.fillText(msg, ctx.width * 0.7, 10)

        ctx.fillStyle = '#80F000'
        ctx.fillText('Ore: ' + env.ore, ctx.width * 0.3, 10)
    }
}
