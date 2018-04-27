
let FQ = 1
let surplus = 0
let popTimer = 0
let oreTimer = 0

module.exports = {

    Z: 100,

    init: function() {
        env.timer = 0
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
        popTimer += dt
        if (popTimer < FQ) return
        popTimer -= FQ

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
        env.timer += dt
        this.handleOre(dt)
        this.handlePopulation(dt)
    },

    draw: function() {
        let day = Math.floor(env.timer/env.dayLength) + 1

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

        ctx.fillStyle = '#9050FF'
        ctx.fillText('Day: ' + day, ctx.width * 0.2, 10)

        ctx.fillStyle = '#80F000'
        ctx.fillText('Ore: ' + env.ore, ctx.width * 0.5, 10)

        ctx.fillStyle = '#F0A000'
        ctx.fillText(msg, ctx.width * 0.8, 10)

        if (_.paused) {
            ctx.font = '48px zekton'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'

            ctx.fillStyle = '#FF80A0'
            ctx.fillText('Paused', ctx.width/2, ctx.height/3)
        }
    }
}
