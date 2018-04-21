module.exports = {
    draw: function() {
        // clear the screen
        ctx.fillStyle = "#250535"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        let loaded = this._.___.res._loaded
        let included = this._.___.res._included
        let percent = Math.round((loaded/included) * 100)

        ctx.textBaseline = 'center'
        ctx.textAlign = 'center'
        ctx.font = '24px Impact'
        ctx.fillStyle = '#a05020'

        // text status
        let progress = '' + loaded + '/' + included + ' '
        ctx.fillText(progress, ctx.width/2, ctx.height/2)

        // percent status
        //ctx.fillText(percent + '%', ctx.width/2, ctx.height/2)

        // bar status
        let w = ctx.width*0.8
        let h = 10
        ctx.fillStyle = '#301060'
        ctx.fillRect((ctx.width-w)/2, ctx.height/2 + 20, w, h)
        ctx.fillStyle = '#a05020'
        ctx.fillRect((ctx.width-w)/2, ctx.height/2 + 20, w*(percent/100), h)
    }
}
