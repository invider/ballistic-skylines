let config = env.tuning.vehicle
let evos = [ function(p) {
	return function(dt) {
		p.x += vx * dt
	}
}, function(p) {
	return function(dt) {
		p.x += vx * dt
	}
} ]

module.exports = function(st) {
	log.out('HERE')
	
	let dx = lib.math.rnds()
	let p = {
		x : -0.55 * dx * ctx.width,
		y : lib.math.linear(config.y1, config.y2, lib.math.rndf()),
		vx : dx * lib.math.linear(config.v1, config.v2, lib.math.rndf())
	}

	return {
		Z : 0,
		evo : evos[lib.math.rndi(evos.length)](p),
		draw : function() {
			let w = st.w || 10
			ctx.save()
			ctx.translate(p.x, p.y)
			ctx.strokeStyle = '#FF0000'
			ctx.fillRect(-5, -5, 10, 10)
			ctx.restore()
		}
	}
}