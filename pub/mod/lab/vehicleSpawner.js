let t = 0

module.exports = {
	evo : function(dt) {
		let config = env.tuning.vehicle
		if ((t -= dt) < 0) {
			t = lib.math.linear(config.t1, config.t2, lib.math.rndf())
            let w = lib.math.linear(config.w1, config.w2, lib.math.rndf())
			sys.spawn('vehicle', {
                w: w,
                h: w * 0.7,
            }, 'camera')
		}
	}
}
