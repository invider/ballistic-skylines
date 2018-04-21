module.exports = function(e) {
    switch(e.key) {
    case ' ': lab.camera.gun.charge(); break;
    case 'ArrowLeft': lab.camera.gun.move(1); break;
    case 'ArrowRight': lab.camera.gun.move(2); break;
    }
}
