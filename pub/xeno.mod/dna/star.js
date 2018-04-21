const DISH_SCALE = 0.7;
const ORBIT_DISTANCE = 20;
const STROKE_STYLE = "blue";
const SEQUENCE_EXEC_PERIOD = 0.4; 

let Star = function (dat) {
    this.type = "star";
    this.timer = 0;
    this.x = dat.x/100 * ctx.width;
    this.y = dat.y/100 * ctx.height;
    this.m = dat.m;
    this.name = dat.name;
    this.sequence = [];
    this.executing = false;
    this.sending = false;
    this.allowCommandReceiving = true;

    // setup color
    this.c = dat.c;
    this.orbitR = this.m + ORBIT_DISTANCE;
    this.angle = dat.angle;

    this.mapRes();
    this.antennaImg = res['star-antenna'];
};

Star.prototype.mapRes = function() {
    switch (this.c) {
        case 0:
            this.img = res['planet-cybertron'];
            break;
        case 1:
            this.img = res['planet-mars'];
            break;

        case 2: this.img = res['planet-mtype']; break;
        case 3: this.img = res['planet-barren']; break;
        case 4: this.img = res['big-planet-ice']; break;
        case 5: this.img = res['big-planet-ice-structures']; break;
        case 6: this.img = res['big-planet-jungle']; break;
        case 7: this.img = res['big-planet-jupiter']; break;
        case 8: this.img = res['big-planet-water-ice']; break;
        default: this.img = res['planet-mars'];
    }
}

Star.prototype.init = function () {
    let commandList = sys.spawn('commandList', this);
    commandList.star = this;
};

Star.prototype.applyCmd = function(cmd){
    if (!cmd){
        throw new Error("Error, command cannot be false");
    }
    if (this.startStar && !this.allowCommandReceiving){
        return;
    }
    if (cmd === _.lib.constants.commands.EOT){
        //
        //  INFO: this is a spike!!!!
        //
        if (!this.targetStar){
            if (!this.sequence.length || this.sequence[this.sequence.length - 1] != _.lib.constants.commands.SEND_TO_NEXT_PLANET){
                this.applyCmd(_.lib.constants.commands.SEND_TO_NEXT_PLANET);
            }
        }
        this.execSequence();
    }
    this.sequence.push(cmd);
};
Star.prototype.execute = function(cmd){
    switch (cmd){
        case _.lib.constants.commands.SEND_TO_NEXT_PLANET:
            this.sending = true;
            lib.sfx('sfx/sequence', 0.7)
            break;
        case _.lib.constants.commands.ROTATE_RIGHT:
            this.rotateAntenna(-_.lib.constants.ROTATE_ANGLE);
            lib.sfx('sfx/turn-right', 0.5)
            break;
        case _.lib.constants.commands.ROTATE_LEFT:
            this.rotateAntenna(_.lib.constants.ROTATE_ANGLE);
            lib.sfx('sfx/turn-left', 0.5)
            break;

        case _.lib.constants.commands.EOT:
            // check if the planet can be fixed
            if (this.targetStar) {
                // success!!! victory!!!
                this.c = 0
                this.mapRes()
                _.trap('eot')
                _.trap('win')
            }
            lib.sfx('sfx/jet', 1)
            break;
    }
};
Star.prototype.tryToExecCmd = function(){
    if (this.sequence.length > 0 ){
        var cmd = this.sequence.shift();
        var res = this.getEnergyStartPoint();
        if (this.sending){
            sys.spawn('signal', {
                x: res.x,
                y: res.y,
                a: this.angle,
                e: env.tuning.signalTTL,
                spawnedBy:this,
                cmd: cmd
            });
        } else {
            this.execute(cmd);
        }
    } else {
        this.executing = false;
    }
};

Star.prototype.evo = function (dt) {
    if (this.executing){
        this.timer += dt;
        if (this.timer > SEQUENCE_EXEC_PERIOD){
            this.tryToExecCmd();
            this.timer = 0;
        }
    }
};

Star.prototype.execSequence = function(){
    this.allowCommandReceiving = false;
    this.executing = true;
    //lib.sfx('sfx/sequence')
};

Star.prototype.rotateAntenna = function(angle){
    this.angle += angle;
};

Star.prototype.getEnergyStartPoint = function(){
    var res = lib.trigonometry.rotateLineAroundFirstDot(this.x, this.y, this.orbitR, this.angle);
    return {
        x: res.x1,
        y: res.y1
    }
};
Star.prototype.drawAntenna = function(){
    // let antennaX = this.x - this.antennaImg.width / 2;
    // let antennaY = this.y - this.antennaImg.height / 2;
    var res = this.getEnergyStartPoint();
    ctx.save();
    ctx.translate(res.x, res.y);
    ctx.rotate(- this.angle);

    ctx.imageSmoothingEnabled = false
    ctx.drawImage(this.antennaImg,
        -this.antennaImg.width * DISH_SCALE,
        -this.antennaImg.height * DISH_SCALE,
        this.antennaImg.width * DISH_SCALE * 2,
        this.antennaImg.height * DISH_SCALE * 2);
    ctx.restore()

};

Star.prototype.draw = function () {
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(this.img, this.x - this.m, this.y - this.m, this.m * 2, this.m * 2)

    // orbit and dish
    ctx.beginPath();
    ctx.strokeStyle = STROKE_STYLE;
    ctx.setLineDash([5, 3]);
    ctx.arc(this.x, this.y, this.orbitR, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.setLineDash([]);
    this.drawAntenna();
};

module.exports = function (dat) {
    return new Star(dat);
};
