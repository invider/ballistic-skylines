module.exports = function(e) {
    if (_.paused) {
        _.paused = false
        return
    }

    switch(e.key) {
    case ' ': lab.gun.fire(); break;
    case 'Shift': lab.gun.unhold(); break;
    case 'ArrowLeft': lab.gun.stop(1); break;
    case 'ArrowRight': lab.gun.stop(2); break;
    case 'ArrowUp': lab.gun.prev(); break;
    case 'ArrowDown': lab.gun.next(); break;

    case ',':
            lab.camControls.stop(lab.camControls.left);
            lab.camControls.center();
            break;
    case '.':
            lab.camControls.stop(lab.camControls.right);
            lab.camControls.center();
            break;

    case 'p':
    case 'P': _.paused = true; break;
    }
}
