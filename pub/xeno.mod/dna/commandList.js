const SIGNAL_WIDTH = 21
const LIST_WIDTH = 500;
const LIST_HEIGHT = 26;
const SIGNAL_MARGIN = 3;
let CommandList = function(dat) {
    //
    //  INFO: mandatory field
    //
    this.star = undefined;
};

CommandList.prototype.init = function() {
};

CommandList.prototype.evo = function(dt) {
};

CommandList.prototype.getItems = function() {
    return this.star.sequence.slice(0);
};
CommandList.prototype.getItemsCount = function() {
    return this.star.sequence.length;
};


CommandList.prototype.getStartX = function(){
    return this.star.x - this.getItemsCount()  * (SIGNAL_WIDTH + SIGNAL_MARGIN)/ 2;
};
CommandList.prototype.getStartY = function(){
    return this.star.y + this.star.orbitR;
};

CommandList.prototype.drawItem = function(cmd, index){
    //ctx.fillStyle = cmd.color;
    //ctx.fillRect(SIGNAL_MARGIN + this.getStartX() + index * (SIGNAL_WIDTH + SIGNAL_MARGIN), this.getStartY() + SIGNAL_MARGIN, SIGNAL_WIDTH, SIGNAL_WIDTH);

    ctx.drawImage(res[cmd.img], SIGNAL_MARGIN + this.getStartX() + index * (SIGNAL_WIDTH + SIGNAL_MARGIN), this.getStartY() + SIGNAL_MARGIN, SIGNAL_WIDTH, SIGNAL_WIDTH);

};

CommandList.prototype.drawItems = function(){
    let items = this.getItems();
    for (var i = 0 ; i<items.length; i++){
        this.drawItem(items[i], i);
    }
};

CommandList.prototype.draw = function() {
    if (this.getItemsCount()){
        ctx.beginPath();
        ctx.rect(this.getStartX(), this.getStartY(), this.getItemsCount() * (SIGNAL_WIDTH + SIGNAL_MARGIN) + SIGNAL_MARGIN, LIST_HEIGHT);
        ctx.stroke();
        this.drawItems();
    }
};

module.exports = function(dat) {
    return new CommandList(dat);
};
