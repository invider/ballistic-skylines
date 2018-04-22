let config = env.tuning.vehicle
let t = 0

module.exports = {
	evo : function(dt) {
		if ((t -= dt) < 0) {
			t1 = 1 / config.freq1
			t2 = 1 / config.freq2
			t = lib.math.linear(t1, t2, lib.math.rndf())
			sys.spawn('vehicle', {}, 'camera')
		}
	}
}