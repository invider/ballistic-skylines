module.exports = function(){
    _.lab.start.applyCmd(_.lib.constants.commands.ROTATE_RIGHT);
    lib.sfx('sfx/select-2', 0.4)
    return false;
};
