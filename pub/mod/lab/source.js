module.exports = {

    evo: function(dt) {
        if (lib.math.rndf() > env.tuning.meteorProbability * dt) return

        sys.spawn('Meteor', {}, 'camera')
    }

}
