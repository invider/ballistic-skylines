module.exports = function(){
    _.lab.start.applyCmd(_.lib.constants.commands.SEND_TO_NEXT_PLANET);
    lib.sfx('sfx/select-3')
    return false;
};
