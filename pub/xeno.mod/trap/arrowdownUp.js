module.exports = function(){
    _.lab.start.applyCmd(_.lib.constants.commands.EOT);
    _.lab.start.execSequence();
    lib.sfx('sfx/sequence', 0.4)
    return false;
};
