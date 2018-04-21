const SIGNAL_WIDTH = 20
const SIGNAL_MARGIN = 10;

let Legend = function() {
    this.x = 15;
    this.y = 40;
};

Legend.prototype.init = function() {
};

Legend.prototype.evo = function(dt) {
};

Legend.prototype.drawLegendLine = function(cmd, y){
    ctx.fillStyle = cmd.color;
    ctx.font = SIGNAL_WIDTH + "px Arial";
    ctx.textAlign ="left";
    ctx.fillRect(this.x, y - SIGNAL_WIDTH,  SIGNAL_WIDTH, SIGNAL_WIDTH);
    ctx.fillText(cmd.description, this.x + SIGNAL_MARGIN + SIGNAL_WIDTH, y);

};
Legend.prototype.draw = function() {
    ctx.beginPath();
    let y = this.y;
    for (let k in $.lib.constants.commands){
        this.drawLegendLine($.lib.constants.commands[k], y);
        y += SIGNAL_WIDTH + SIGNAL_MARGIN;
    }
    ctx.stroke();
};

module.exports = new Legend();

