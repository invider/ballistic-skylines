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

	center : function() {
		if (dir != undefined) {
			dir.stop()
			dir = undefined;
		}
		lab.camera.x = target.x = lab.gun.x
	},

	stop : function(d) {
		if (dir != undefined && (d == undefined || d === dir)) {
			dir.stop()
			dir = undefined
		}
	},

	move : function(d) {
		if (d !== dir) {
			if (dir != undefined) {
				dir.stop()
			}
			dir = d
			t = 0
		}
	}
}