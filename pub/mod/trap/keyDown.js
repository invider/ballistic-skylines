module.exports = function(e) {
    if (_.paused) return

    switch(e.key) {
    case ' ': lab.gun.hold(); break;
    case 'Shift': lab.gun.holdToLast(); break;
    case 'ArrowLeft': lab.gun.move(1); break;
    case 'ArrowRight': lab.gun.move(2); break;
    case ',': lab.camControls.move(lab.camControls.left); break;
    case '.': lab.camControls.move(lab.camControls.right); break;
    }
}
