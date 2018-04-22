module.exports = function(e) {
    switch(e.key) {
    case ' ': lab.gun.fire(); break;
    case 'Shift': lab.gun.unhold(); break;
    case 'ArrowLeft': lab.gun.stop(1); break;
    case 'ArrowRight': lab.gun.stop(2); break;

    case 'ArrowUp': lab.gun.prev(); break;
    case 'ArrowDown': lab.gun.next(); break;
    case ',': lab.camControls.stop(lab.camControls.left); break;
    case '.': lab.camControls.stop(lab.camControls.right); break;
    }
}
