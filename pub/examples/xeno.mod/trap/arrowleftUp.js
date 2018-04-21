module.exports = function () {
    _.lab.start.applyCmd(_.lib.constants.commands.ROTATE_LEFT)
    lib.sfx('sfx/select-1', 0.4)
    return false;
};
