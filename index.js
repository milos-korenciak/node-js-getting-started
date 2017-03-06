var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/testPng', function(request, response) {
  var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(200, 200)
  , ctx = canvas.getContext('2d');

  ctx.font = '30px Impact';
  ctx.rotate(.1);
  ctx.fillText("Fungujeeeeeeeem!", 50, 100);

  var te = ctx.measureText('Awesome!');
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.lineTo(50, 102);
  ctx.lineTo(50 + te.width, 102);
  ctx.stroke();
 
  
  var fs = require('fs')
  , out = fs.createWriteStream('/tmp/text.png')
  , stream = canvas.pngStream();

  //stream.on('data', function(chunk){
  //	  out.write(chunk);
  //});

  stream.on('end', function(){
    console.log('saved png');
  });

  response.sendFile("/tmp/text.png", {}, function (){
        //fs.unlink("/tmp/text.png"); // delete the file
    })
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


