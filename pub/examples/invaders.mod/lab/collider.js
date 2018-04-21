module.exports = {
    evo: function(dt) {

        lab.collide(function(s, t) {
            if (s.x+s.r >= t.x-t.r
                    && s.x-s.r <= t.x+t.r
                    && s.y+s.r >= t.y-t.r
                    && s.y-s.r <= t.y+t.r) {
                if (sys.isFun(s.hit)) {
                    s.hit(t)
                }
            }
        },
        t => {
            if (t.type) return true;
            else return false;
        })
    }
}
