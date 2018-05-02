module.exports = {

    evo: function(dt) {
        if (env.clearSky) return
        if (lib.math.rndf() > env.tuning.meteorProbability * dt) return

        sys.spawn('Meteor', {}, 'camera')
    }

}
