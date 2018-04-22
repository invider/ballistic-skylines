module.exports = function(e) {
    switch(e.key) {
    case ' ': lab.gun.hold(); break;
    case 'Shift': lab.gun.holdToLast(); break;
    case 'ArrowLeft': lab.gun.move(1); break;
    case 'ArrowRight': lab.gun.move(2); break;
    }
}
