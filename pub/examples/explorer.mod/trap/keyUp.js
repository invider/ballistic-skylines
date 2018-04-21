module.exports = function(e) {
    switch(e.key) {
    case 'ArrowLeft': lab.camera.keys[0] = false; break;
    case 'ArrowUp': lab.camera.keys[1] = false; break;
    case 'ArrowRight': lab.camera.keys[2] = false; break;
    case 'ArrowDown': lab.camera.keys[3] = false; break;
    }
}
