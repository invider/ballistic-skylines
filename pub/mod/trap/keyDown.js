function moveCamera(dx) {
	let p0 = lab.camera.target || {x:0, y:0}
	p0.x += dx
	lab.camera.target = p0
}

module.exports = function(e) {
    switch(e.key) {
    case ' ': lab.gun.hold(); break;
    case 'Shift': lab.gun.holdToLast(); break;
    case 'ArrowLeft': lab.gun.move(1); break;
    case 'ArrowRight': lab.gun.move(2); break;
    case ',': lab.camControls.move(lab.camControls.left); break;
    case '.': lab.camControls.move(lab.camControls.right); break;
    case '/': lab.camControls.center(); break;
    }
}
