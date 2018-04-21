module.exports = {
    _info: 'system functions',
    cp: function(source, target) {
        _.log.sys('copying ' + source + ' -> ' + target)

        let list = this._.select(source)
        if (list.length === 0) return false
        let dest 
        if (this._.sys.isString(target)) {
            dest = this._.select(target)
            if (dest.length !== 1) return false // can't copy if no node or more than one found
            dest = dest[0]
        } else {
            dest = target
        }

        if (!this._.sys.isFrame(dest)) return false
        list.forEach( function(e) {
            dest.attach(e)
        })
        return list.length
    },
    spawn: function(source, spawnData, target, sbase, tbase) {
        if (!sbase) sbase = 'dna/'
        if (!tbase) tbase = 'lab/'
        
        let cons = source
        if (this._.sys.isString(source)) {
            cons = this._.selectOne(sbase + source)
            if (!cons) throw "can't find the spawn dna: "
                + this._.name + '::' + sbase + source
        }

        let dest = target
        if (!target || target === '') {
            dest = this._.lab
        } else if (this._.sys.isString(target)) {
            dest = this._.select(tbase + target)
            if (dest.length === 0) throw "can't find spawn target: "
                + this._.name + '::' + tbase + target
            if (dest.length > 1) throw "ambiguous target for spawn: "
                + tbase + target
            dest = dest[0]
        }
        if (!sys.isFrame(dest)) return false

        /*
        this._.log.debug('~~~ spawning @'
            + this._.name + ':' + sbase + source + ' -> '
            + tbase + target)
        */

        if (sys.isFun(cons)) {
            // source is function - constructor or factory
            if (/[A-Z]/.test(cons.name[0])) {
                // uppercase means constructor
                let res = new cons(spawnData)
                dest.attach(res)
                return res
            } else {
                // lowercase means factory
                return dest.attach(cons(spawnData))
            }
        } else if (sys.isObj(cons)) {
            if (isFun(cons.spawn)) {
                // spawn() function
                return dest.attach(cons.spawn(spawnData))
            } else {
                return this.clone(cons)
            }
        } else {
            return false
        }
    },

    // TODO maybe work on tree instead of generic?
    clone: function(obj, meta) {
        if (!this.isObj(obj)) return
        if (this.isFun(obj.clone)) return obj.clone(meta)

        // buffer and replace mod and parent links
        // to avoid circular links
        let _ = obj._
        let __ = obj.__
        obj._ = null
        obj.__ = null

        let res = JSON.parse(JSON.stringify(obj))
        this.augment(res, meta)

        // restore links on original object
        obj._ = _
        obj.__ = __

        return res
    },
}

