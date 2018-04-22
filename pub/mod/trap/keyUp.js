module.exports = function(e) {
    switch(e.key) {
    case ' ': lab.gun.fire(); break;
    case 'Shift': lab.gun.lastFire = false;
    case 'ArrowLeft': lab.gun.stop(1); break;
    case 'ArrowRight': lab.gun.stop(2); break;

    case 'ArrowUp': lab.gun.prev(); break;
    case 'ArrowDown': lab.gun.next(); break;
    }
}
