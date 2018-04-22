module.exports = function(e) {
    switch(e.key) {
    case ' ': lab.camera.gun.fire(); break;
    case 'Shift': lab.camera.gun.lastFire = false;
    case 'ArrowLeft': lab.camera.gun.stop(1); break;
    case 'ArrowRight': lab.camera.gun.stop(2); break;

    case 'ArrowUp': lab.camera.gun.prev(); break;
    case 'ArrowDown': lab.camera.gun.next(); break;
    }
}
