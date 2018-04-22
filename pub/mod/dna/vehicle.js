let evos = [ function(p) {
	return function(dt) {
		p.x += p.vx * dt
		if(p.distant()) {
			this.__.detach(this)
		}
	}
}, function(p) {
	let config = env.tuning.vehicle
	let A = ctx.height * lib.math.linear(0.01, 0.05, lib.math.rndf())
	let m = lib.math.linear(0.5, 0.85, lib.math.rndf())
	return function(dt) {
		let t = p.t || 0
		p.t = t + dt
		p.x += p.vx * dt
		p.y += A*(Math.sin(m*p.t) - Math.sin(m*t))   
		if(p.distant()) {
			this.__.detach(this)
		}
	}
} ]

module.exports = function(st) {
	let config = env.tuning.vehicle

    let type = lib.math.rndi(res.car.length)
	let dx = lib.math.rnds()
	let x0 = lab.camera.worldX(ctx.width*(1-dx)*0.5)
	let p = {
		x : x0,
		y : -ctx.height * lib.math.linear(config.y1, config.y2, lib.math.rndf()),
		vx : dx * lib.math.linear(config.v1, config.v2, lib.math.rndf()),
		distant: function() {
			let xn = lab.camera.worldX(ctx.width*(0.5+dx))
			return (this.x-x0)*(this.x-xn)>0
		}
	}

	return {
		Z : 0,
		evo : evos[lib.math.rndi(evos.length)](p),
		draw : function() {
			let w = st.w || 30
			let h = st.h || 21
			ctx.save()
			ctx.translate(p.x, p.y)
            ctx.imageSmoothingEnabled = false
            ctx.scale(dx, 1);
            ctx.drawImage(res.car[type], -w/2, -h/2, w, h)
			ctx.restore()
		}
	}
}
