const http = require('http');
var fs = require('fs');
var path = require('path');
var filePath = '/tmp/text.png';

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

    var out = fs.createWriteStream(filePath)
    , stream = canvas.pngStream();

    stream.on('data', function(chunk) {
        out.write(chunk);
        console.log('c');
    });

    stream.on('end', function(){
        console.log('e');
    });
    
    var stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
});

server.listen(1337);
