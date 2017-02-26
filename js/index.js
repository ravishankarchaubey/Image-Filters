var image=null;
var rimage=null
var ruimage=null;
var gimage=null;
var rstimage=null;
var rcimage=null;
var rbowimg=null;
var blurimg=null;
var borderimg=null;
var canvas=null;
function uploadImage(){
  var filename=document.getElementById("img");
  canvas=document.getElementById("can");
  image=new SimpleImage(filename);
  gimage=new SimpleImage(filename);
  rimage=new SimpleImage(filename);
  rstimage=new SimpleImage(filename);
  ruimage=new SimpleImage(filename);
  rcimage=new SimpleImage(filename);
  rbowimg=new SimpleImage(filename);
  blurimg=new SimpleImage(filename);
  borderimg=new SimpleImage(filename);
  image.drawTo(canvas);
}

function doGrayscale(){
  canvas=document.getElementById("can");
  for(var pixel of gimage.values()){
    var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  gimage.drawTo(canvas);
}

function doRedscale(){
  canvas=document.getElementById("can");
  for(var pixel of ruimage.values()){
    pixel.setRed(255);
  }
  ruimage.drawTo(canvas);
}

function doRedhue(){
  canvas=document.getElementById("can");
  for(var pixel of rimage.values()){
    var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if(avg<128){
      pixel.setRed(avg*2);
      pixel.setGreen(0);
      pixel.setBlue(0);
    }else{
      pixel.setRed(255);
      pixel.setGreen(255-avg*2);
      pixel.setBlue(255-avg*2);
    }
  }
  rimage.drawTo(canvas);
}

function doRc(){
  canvas=document.getElementById("can");
  for(var pixel of rcimage.values()){
    if(pixel.getY()<rcimage.getHeight()/3){
      pixel.setRed(Math.random()*256);
      pixel.setAlpha(Math.random()*9+92);
    }
    else if(pixel.getY()<rcimage.getHeight()*2/3){
      pixel.setGreen(Math.random()*256);
      pixel.setAlpha(Math.random()*16+85);
    }
    else{
      pixel.setBlue(Math.random()*256);
      pixel.setAlpha(Math.random()*5+96);
    }
  }
  rcimage.drawTo(canvas);
}

function doResetImage(){
  canvas=document.getElementById("can");
  var context=canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
  if(rstimage!=image)
    rstimage.drawTo(canvas);
}

function isImageLoaded(){
  if(image==null||!image.complete()){
    return false;
  }else{
    true;
  }
}

function doRainbow(){
  canvas=document.getElementById("can");
  for(var pixel of rbowimg.values()){
    var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if(pixel.getY()<rbowimg.getHeight()/7){
      if(avg<128){
        pixel.setRed(2*avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      }else{
        pixel.setRed(255);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(2*avg-255);
      }
    }
    else if(pixel.getY()<rbowimg.getHeight()*2/7){
      if(avg<128){
        pixel.setRed(2*avg);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0);
      }else{
        pixel.setRed(255);
        pixel.setGreen(1.2*avg-51);
        pixel.setBlue(2*avg-255);
      }
    }
    else if(pixel.getY()<rbowimg.getHeight()*3/7){
      if(avg<128){
        pixel.setRed(2*avg);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      }else{
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg-255);
      }
    }
    else if(pixel.getY()<rbowimg.getHeight()*4/7){
      if(avg<128){
        pixel.setRed(0);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      }else{
        pixel.setRed(2*avg-255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg-255);
      }
    }
    else if(pixel.getY()<rbowimg.getHeight()*5/7){
      if(avg<128){
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      }else{
        pixel.setRed(2*avg-255);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(255);
      }
    }
    else if(pixel.getY()<rbowimg.getHeight()*6/7){
      if(avg<128){
        pixel.setRed(.8*avg);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      }else{
        pixel.setRed(1.2*avg-51);
        pixel.setGreen(2*avg-51);
        pixel.setBlue(255);
      }
    }
    else{
      if(avg<128){
        pixel.setRed(1.6*avg-51);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avg-255);
      }else{
        pixel.setRed(0.4*avg+153);
        pixel.setGreen(2-avg-255);
        pixel.setBlue(0.4*avg+153);
      }
    }
  }
  rbowimg.drawTo(canvas);
}

/*function doBlur(){
  canvas=document.getElementById("can");
  var img=new SimpleImage(blurimg.getWidth(),blurimg.getHeight());
  for(var pixel of blurimg.values()){
    var rndm=Math.random();
    if(rndm<0.5){
  img.setPixel(blurimg.setX(),blurimg.setY(),pixel);
    }
    else{
      var x=provideCoordinateX();
      var y=provideCoordinateY();
      img.setPixel(x,y,pixel);
    }
  }
  img.drawTo(canvas);
}

function provideCoordinateX(){
  var x=blurimg.getX()-Math.random()*10+1;
  //if(x<0||x>blurimg.getWidth()-1)
    //x=blurimg.getX();
  return x;
}

function provideCoordinateY(){
  var y=blurimg.getY()-Math.random()*10+1;
  if(y<0||y>blurimg.getHeight()-1)
    y=blurimg.getY();
  return y;
}*/

function setBlack(x){
    x.setRed(0);
    x.setBlue(0);
    x.setGreen(0);
    return x;
}
function pixelOnEdge(image,pixel,horizontalThick, verticalThick){
    var x = pixel.getX();
    var y = pixel.getY();
    if (x < verticalThick || x > image.getWidth() - verticalThick){
        return true;
    }
    if (y < horizontalThick || y > image.getHeight() - horizontalThick){
        return true;
    }
    return false;
}

function addBorders(){
  canvas=document.getElementById("can");
    for (var px of borderimg.values()){
        if (pixelOnEdge(borderimg,px,15,15)){
            px = setBlack(px);
        }
    }
    borderimg.drawTo(can);
}

function ensureInImage(coordinate, size) {
  if (coordinate < 0) {
    return 0;
  }
  if (coordinate >= size) {
    return size - 1;
  }
  return coordinate;
}

function getPixelNearby(image, x, y, diameter) {
  var dx = Math.random() * diameter - diameter / 2;
  var dy = Math.random() * diameter - diameter / 2;
  var nx = ensureInImage(x + dx, image.getWidth());
  var ny = ensureInImage(y + dy, image.getHeight());
  return image.getPixel(nx, ny);
}

function doBlur() {
  for (var pixel of blurimg.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (Math.random() > 0.5) {
      var other = getPixelNearby(blurimg, x, y, 15);
      blurimg.setPixel(x, y, other);
    } else {
      blurimg.setPixel(x, y, pixel);
    }
    }
  blurimg.drawTo(can);
  }
