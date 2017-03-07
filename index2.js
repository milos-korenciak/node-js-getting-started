const http = require('http');
var fs = require('fs');
var path = require('path');

const server = http.createServer( (req, res) => {
  // req is an http.IncomingMessage, which is a Readable Stream
  // res is an http.ServerResponse, which is a Writable Stream

    var Canvas = require('canvas')
    , Image = Canvas.Image
    , canvas = new Canvas(200, 200)
    , ctx = canvas.getContext('2d')
    , body = '';  

    ctx.font = '30px Impact';
    ctx.rotate(.1);
    ctx.fillText("Fungujeeeeeeeem!", 50, 100);

    var te = ctx.measureText('Awesome!');
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.lineTo(50, 102);
    ctx.lineTo(50 + te.width, 102);
    ctx.stroke();

    var stream = canvas.pngStream();

    stream.pipe(res);
});

server.listen(process.env.PORT || 5000);
