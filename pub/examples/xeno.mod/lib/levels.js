/** @typedef {{x:number, y:number, m:number, angle:number, maxAngleDiff:number, c:number}} Planet
/**
 * @type {[{name:string, description:string, start:Planet, end:Planet, planets:[Planet]}]}
 */

const HOUR = Math.PI / 6;

let rfi = function() {
    return Math.floor((Math.random() * 12)) * HOUR
}

let rrd = function() {
    return 20 + Math.floor(Math.random() * 20)
}

let rndp = function() {
    return 2 + Math.floor(Math.random() * 6)
}

module.exports = [
    {
        name:"Try to solve",
        description:"",

        start:{
            x:80, y:80,
            m:35, c:0,
            name: "start",
            angle: 9 * HOUR,
        },
        end:{
            x:15, y:25,
            //x:55, y:84,
            m:30, c:1,
            name: "target",
            angle: 8 * HOUR,
        },

        planets:[
            {
                x:35, y:25,
                m:rrd(), c:rndp(),
                angle: rfi(),
            }, {
                x:11, y:50,
                m:rrd(), c:rndp(),
                angle: rfi(),
            }, {
                x:42, y:10,
                m:rrd(), c:rndp(),
                angle: rfi(),
            }, {
                x:62, y:40,
                m:rrd(), c:rndp(),
                angle: rfi(),
            }, {
                x:42, y:50,
                m:rrd(), c:rndp(),
                angle: rfi(),
            }, {
                x:30, y:35,
                m:rrd(), c:rndp(),
                angle: rfi(),
            }, {
                // earth-like close planet
                x:70, y:60,
                m:rrd(), c:rndp(),
                angle: rfi(),
            }, {
                x:85, y:28,
                m:rrd(), c:rndp(),
                angle: rfi(),
            }, {
                x:66, y:15,
                m:rrd(), c:rndp(),
                angle: rfi(),
            }, {
                x:20, y:70,
                m:rrd(), c:rndp(),
                angle: rfi(),
            }, {
                x:58, y:68,
                m:rrd(), c:rndp(),
                angle: rfi(),
            },
        ]
    }
];
