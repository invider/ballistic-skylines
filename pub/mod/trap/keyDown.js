module.exports = function(e) {
    switch(e.key) {
    case ' ': lab.camera.gun.hold(); break;
    case 'Shift': lab.camera.gun.holdToLast(); break;
    case 'ArrowLeft': lab.camera.gun.move(1); break;
    case 'ArrowRight': lab.camera.gun.move(2); break;
    }
}
