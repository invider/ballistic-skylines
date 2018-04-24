module.exports = {
	evo : function(dt) {
		//if ((t -= dt) < 0) {
			//t = lib.math.linear(config.t1, config.t2, lib.math.rndf())
		let conf = env.vehicle
        let effectivePopulation = Math.min(env.population, conf.populationFactor)
        let p = lib.math.linear(conf.minFreq, conf.maxFreq,
            effectivePopulation/conf.populationFactor)

        if (lib.math.rndf() < p * dt) {
            let scale  = lib.math.linear(conf.s1, conf.s2, lib.math.rndf())
			sys.spawn('vehicle', {
                scale: scale
            }, 'camera')
		}
	}
}
