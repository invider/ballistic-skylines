module.exports = function(e) {
    if (_.paused) return

    switch(e.code) {
    case 'Space': lab.gun.hold(); break;
    case 'ShiftLeft':
    case 'ShiftRight':
            lab.gun.holdToLast(); break;
    case 'ArrowLeft': lab.gun.move(1); break;
    case 'ArrowRight': lab.gun.move(2); break;
    case 'Comma': lab.camControls.move(lab.camControls.left); break;
    case 'Period': lab.camControls.move(lab.camControls.right); break;

    case 'BracketLeft': lab.panel.volumeDown(true); break;
    case 'BracketRight': lab.panel.volumeUp(true); break;
    }
}
