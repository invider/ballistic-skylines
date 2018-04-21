module.exports = function(e){
    if (!e.ctrlKey && !e.altKey && !e.shiftKey) lab.hero.move(4)
    return false;
};
