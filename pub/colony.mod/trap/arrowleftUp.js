module.exports = function (e) {
    if (e.ctrlKey || e.altKey || e.shiftKey) lab.hero.build(1)
    trap.echo('movekeyUp')
    return false;
};
