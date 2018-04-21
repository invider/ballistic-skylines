module.exports = function(e) {
    let digit = e.which - 48
    if (digit >= 0 && digit < 10) {
        lab.panel.input(digit)
    }
}
