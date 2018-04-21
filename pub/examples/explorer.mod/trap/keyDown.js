module.exports = function(e) {
    switch(e.key) {
    case 'ArrowLeft': lab.camera.keys[0] = true; break;
    case 'ArrowUp': lab.camera.keys[1] = true; break;
    case 'ArrowRight': lab.camera.keys[2] = true; break;
    case 'ArrowDown': lab.camera.keys[3] = true; break;
    }
}
