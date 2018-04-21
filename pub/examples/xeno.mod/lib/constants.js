module.exports = {
    commands:{
        ROTATE_LEFT:{
            img: 'signal-left',
            color:'#40FF00',
            description:"Rotate transmitter left"
        },
        ROTATE_RIGHT:{
            img: 'signal-right',
            color:'#FFFF00',
            description:"Rotate transmitter right"
        },
        SEND_TO_NEXT_PLANET:{
            img: 'signal-relay',
            color:'#0060EE',
            description:"Relay message"

        },
        EOT:{
            img: 'signal-transmit',
            color:'#FF2040',
            description:"End of Transmission"
        }
    },
    ROTATE_ANGLE: Math.PI / 6
};
