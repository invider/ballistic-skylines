module.exports = {
    /**
     * rotate vertical line (x, y and length) to angle
     * @param x
     * @param y
     * @param length
     * @param angle
     * @returns {{x: number, y: number, x1: number, x2: number}}
     */
    rotateLineAroundFirstDot: function(x, y, length, angle){
        var xOffset = length * Math.sin(angle);
        var yOffset = length * Math.cos(angle);
        return {
            x: x,
            y: y,
            x1: x - xOffset,
            y1: y - yOffset
        }
    }
};