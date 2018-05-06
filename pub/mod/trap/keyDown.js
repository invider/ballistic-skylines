let shots = 0

module.exports = function(e) {
    if (_.paused) return

    switch(e.code) {
    case 'Space': lab.gun.hold(); break;
    case 'ShiftLeft':
    case 'ShiftRight':
            lab.gun.holdToLast(); break;
    case 'ArrowLeft': case 'KeyA': lab.gun.move(1); break;
    case 'ArrowRight': case 'KeyD': lab.gun.move(2); break;
    case 'ArrowUp': lab.gun.prev(true); break;
    case 'ArrowDown': case 'KeyE': lab.gun.next(true); break;
    case 'Comma': lab.camControls.move(lab.camControls.left); break;
    case 'Period': lab.camControls.move(lab.camControls.right); break;

    case 'BracketLeft': lab.panel.volumeDown(true); break;
    case 'BracketRight': lab.panel.volumeUp(true); break;

    case 'KeyR':
        if (!e.repeat) {
            lab.rain.makeItRain()
        }
        break;

    case 'KeyF':
        if (!e.repeat) {
            lab.fog.makeItFog()
        }
        break;

    case 'Backspace':
        if (!e.repeat) {
            lab.panel.switchSky()
        }
        break;

    case 'Digit8':
        if (!e.repeat) {
            lib.img.screenshot('skyline-' + (++shots))
        }
        break;
        
    case 'KeyZ':
        if (!e.repeat && (e.ctrlKey || altKey)) {
            lab.score.addOre(100)
        }
        break;

    case 'KeyL':
        if (!e.repeat && (e.ctrlKey || altKey)) {
            trap('levelUp')
        }
        break;

    }
}
