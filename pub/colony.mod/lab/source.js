
module.exports = {

    monsterCount: function() {
        return lab._ls.reduce((c, e) => { return (e.type === 101? c+1 : c) }, 0)
    },

    evo: function(dt) {
        if ((this.monsterCount() < env.planet.maxMonsters)
                && (lib.math.rndf() < env.planet.spawnRate * dt)) {
            sys.spawn('monster')
        }
    }

}
