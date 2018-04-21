module.exports = function(e) {
    if (e.ctrlKey || e.altKey || e.shiftKey) lab.hero.build(2)
    trap.echo('movekeyUp')
    return false;
};
