let dir = undefined
let t = undefined
let target = {
	x : 0,
	y : -ctx.height / 4
}

function millis() {
	return new Date().getTime()
}

function mkdir(dx) {
	return {
		move : function() {
			target.x += lab.camera.speed * dx
			lab.camera.target = target
		},

		stop : function() {
			target.x -= lab.camera.speed * dx * t
			lab.camera.target = undefined
		}
	}
}

module.exports = {
	left : mkdir(-1),
	right : mkdir(1),

	evo : function(dt) {
		if (dir != undefined) {
			if ((t -= dt) < 0) {
				dir.move()
				t = 1
			}
		}
	},

	move : function(params) {
		if (params.center) {
			if (dir != undefined) {
				dir.stop()
				dir = undefined;
			}
			lab.camera.x = target.x = 0
		} else if (params.stop) {
			if (dir === params.dir) {
				dir.stop()
				dir = undefined
			}
		} else if (params.dir) {
			if (dir !== params.dir) {
				if (dir != undefined) {
					dir.stop()
				}
				dir = params.dir
				t = 0
			}
		}
	}
}