var yoff = 0.0;        // 2nd dimension of perlin noise
var xoff = 0.0;
var clicked;
var mx = 0.0;
var my = 0.0;
var eX = 0,
    eY = 0,
    diameter = 72,
    isClicked = false,
    w,
    bc;
var loaded = false;

var rising;

var z=255;
var redc = 255;

var reading = true;
var read = false;
var hide =255;

var num = 20;

var monsterW = 4;
var monsterH = 0.5;
var monsterSpeed = 0.1;

var opacity = 0;

var tentacles = [];




function setup() {
  createCanvas(windowWidth, windowHeight);
  smooth();
  noCursor();

  

//___________FLOCK___________

flock = new Flock();
  // Add an initial set of boids into the system
  for (var i = 0; i < 50; i++) {
    var zz = new Boid(width-400,height-100);
    flock.addBoid(zz);
  }

//___________FLOCK ENDS_______

//_______sea trees_____

tentacles = [];

  for (var i = 0; i < num; i++) {
    tentacles.push(new Tentacle());
  }




//______end_______




  eY=height-50;

// COLORS

  w = 255;
  bc = 51;
}

function draw() {
    
 

    mx = 0.04;
    my = 0.04;


    // mx = map(mouseX, 0, windowWidth, 0.01, 0.04);
    // my = map(mouseY, 0, windowHeight, 0.01, 0.04);

  background(z);
if(read){
  flock.run();
}
  if (isClicked){
    black();
    // fill(redc,0,0);
  }else{
    white();
  }


 if (eX <252) {
      eX=eX+1;
    };
    if (eY > 144) {
      eY=eY-1;
    };
  
  // console.log (redc);
  if(read){
  stroke(20,opacity);  
  ellipse(eX, eY, diameter, diameter);
}

// if (clicked) {
//   fill(r);


// }
// else {fill(g)}
  // fill(redc,redc,redc);
  // We are going to draw a polygon out of the wave points
  beginShape(); 
  

  var xoff = 0; 

  
  var yWave = height-150;

  // Iterate over horizontal pixels
  for (var x = 0; x <= width+100; x += 10) {
    // Calculate a y value according to noise, map to 
    
    // Option #1: 2D Noise
    var y = map(noise(xoff, yoff), 0, 1, yWave,rising);

  // console.log(x,y)
    // Set the vertex
    stroke(0,opacity);
    vertex(x, y); 
    // Increment x dimension for noise
    xoff += 0.05;
//     if(reading){
//     xoff += 0;
//     // yoff = 1;
// } else {
//   xoff += -0.05;
// }


  }
  // increment y dimension for noise
  // yoff += 0.01;
  yoff += 0.01;
  
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

if (reading){
monsterH=0;
monsterW=1;

//____flowers___

fill(40, hide);
noStroke();
// stroke(40, hide);

textFont("HelveticaNeue-Light");
textAlign(CENTER);
    text("ZYNE welcomes you...",width/2,height/2-150);
    text("Place your left hand fingers on the A, S, D, F keys",width/2,height/2-100);
    text("Place your right hand fingers on the J, K, L, ; keys",width/2,height/2-50);
    text("If you did it right, your thumbs should be on the SPACE",width/2,height/2);
    text("SPACE will start/stop the magic",width/2,height/2+50);
    text("Push/Hold the rest of the buttons to produce magic",width/2,height/2+100);
    text("Hit any key when you're ready to remove this screen",width/2,height/2+150);
  
  
stroke(40, hide);
  beginShape();

    
  curveVertex( width/2-200, height/2-200);
  curveVertex( width/2+200, height/2-200);
  curveVertex( width/2+200, height/2+200);
  curveVertex( width/2-200, height/2+200);
  curveVertex( width/2-200, height/2-200);
   curveVertex( width/2+200, height/2-200);
    curveVertex( width/2+200, height/2+200);
      curveVertex( width/2-200, height/2+200);


  endShape();

if(read){
  hide = hide-5;
  if (opacity < 255){
  opacity = opacity+3;
}
}

if (hide <1){
  reading = false;
}


}
for (var i=0; i<num; i++) {
    tentacles[i].paint();

  }



}

function keyPressed() {

  if (reading) {
read = true;
}

  if (!reading && key === ' ') {
 isClicked=!isClicked;
}
}



function black(){
  // fill(bc);
  // background(bc);
  z=51;
  Tone.Transport.start();
  xoff+=mx;
  yoff+=my;
  // yoff+=0.05;
  rising = rising-0.95;
  monsterW = monsterW+0.1;
  monsterH = monsterH+0.005;
  monsterSpeed = .05;

for (var i=0; i<50; i++){
  if (flock.boids[i].maxspeed <8){
  flock.boids[i].maxspeed = flock.boids[i].maxspeed+1;
}
}


}

function white(){
  fill(w);
  Tone.Transport.stop();
  z=255;
  rising = height-250;

if(monsterW >=4){
  monsterW = 4;}
  if(monsterH >=0.5){
  monsterH = 0.5;}
  


  if(monsterW <=4){
  monsterW = monsterW+0.01;}
  if(monsterH <=0.5){
  monsterH = monsterH+0.01;}


  monsterSpeed = .01;


for (var i=0; i<50; i++){

  flock.boids[i].maxspeed = 2;
}

}

document.addEventListener("keydown", function(){
  if(isClicked){
  if(rising < (height-150)){
  rising = rising+10;
}
  if(monsterW >=4){
  monsterW = monsterW-1.2;}
  if(monsterH >=0.5){
  monsterH = monsterH-0.06;}
  // yoff+=0.01;
  yoff+=random(0.01,0.1);
  // flock.run.ali.mult(2);

// for (var i=0; i<50; i++){
//   if (flock.boids[i].maxspeed >2){
//   flock.boids[i].maxspeed = flock.boids[i].maxspeed-5;
// }
// }

};
})

// When the user clicks the mouse
function mousePressed() {
  // Check if mouse is inside the circle
if (dist(mouseX,mouseY,eX,eY) < diameter){
  isClicked = !isClicked;
}






  // var d = dist(mouseX, mouseY, 252, 144);
  // if (d < 100 && !clicked) {
  //   xoff+=mx;
  //   yoff+=my;
  //   // Pick new random color values
  //   fill(w);
  // Tone.Transport.start();
  //   clicked = !clicked;
  // } else if (d < 100 && clicked){
  //   Tone.Transport.stop();
  //   clicked = !clicked;
  //   fill(b)
  //}

}

//____________________________________________________________

// var MusClass = function(){
 
// var synth = new Tone.AMSynth();
// var filter = new Tone.Filter();

// synth.connect(filter);
// filter.toMaster();

// var lfo = new Tone.LFO("64n", 5000, 7400);
// lfo.connect(filter.frequency);
// lfo.sync();

// var notes = ["C2", "E4", "C2", "G4","C2", "A4"];
// var position = 0;

// Tone.Transport.setInterval(function(time){
//     var note = notes[position++];
//     position = position % notes.length;
//     synth.triggerAttackRelease(note, "8n", time);
// }, "32n");

// //the transport won't start firing events until it's started




  
// }



var MusClass = function(){
 
this.synth = new Tone.AMSynth();
this.filter = new Tone.Filter();
this.synth.volume.value = -10;

this.synth.connect(this.filter);
this.filter.toMaster();

this.lfo = new Tone.LFO("4n", 2000,2500);
this.lfo.connect(this.filter.frequency);
this.lfo.sync();

this.reverb = new Tone.Freeverb(0.7,0.1);
this.reverb.toMaster();
this.synth.connect(this.reverb);

this.wah = new Tone.AutoWah(10, 6, -20);
this.wah.toMaster();
this.synth.connect(this.wah);


this.notes = ["D3", "E3", "F3", "A3","Bb3", "D4", "E4", "F4", "D3", "F4", "D3", "E3","F3", "Bb3"]; // D-Akebono
this.position = 0;

var self = this;

Tone.Transport.setInterval(function(time){
    self.note = self.notes[self.position++];
    self.position = self.position % self.notes.length;
    self.synth.triggerAttackRelease(self.note, "8n", time);
}, "8n");

//the transport won't start firing events until it's started
}

MusClass.prototype.player = function(){
   this.player = new Tone.Player("./seaside7min.mp3");
   this.player.volume.value = -20;
   this.player.toMaster();
   
   this.buffer = new Tone.Buffer("./seaside7min.mp3");
   this.buffer.onload = function(){
    loaded = true;
    console.log (loaded)
   }
  // .connect(this.feedbackDelay);

}

var EngageClass = function(){
  this.synth = new Tone.MonoSynth().toMaster();
  this.synth.volume.value = -30;
  

  this.notes = {
    "a" : "D3",
    "s" : "E3",
    "d" : "F3",
    "f" : "A3",

    "j" : "Bb3",
    "k" : "D4",
    "l" : "E4",
    ";" : "F4"
  }; 



this.filter = new Tone.Filter();
this.synth.volume.value = -30;

this.synth.connect(this.filter);
this.filter.toMaster();

this.lfo = new Tone.LFO("4n", 2000,2500);
this.lfo.connect(this.filter.frequency);
this.lfo.sync();

this.reverb = new Tone.Freeverb(0.7,0.9);
this.reverb.toMaster();
this.synth.connect(this.reverb);

this.wah = new Tone.AutoWah(10, 6, -20);
this.wah.toMaster();
this.synth.connect(this.wah);

  var self = this;
}



function Tentacle(){
  this.phi = random(TWO_PI);
  this.frequency = random(30,100);
  this.amplitude = random(.1, .9);
  this.numPoints = random(50,125);
  this.position = createVector(random(width),height);

}

Tentacle.prototype.paint = function(){
push();
translate(this.position.x, this.position.y);

var x,y;

for (var i = -10; i < this.numPoints; i++){
  y = -i*monsterH;

  x = sin(y/this.frequency + this.phi)*i*this.amplitude;
  
  var diameter = map(i,0,this.numPoints,monsterW,1);
  fill(40,20);
  noStroke();
  ellipse(x,y,diameter,diameter);

}
this.phi -= monsterSpeed;

pop();
}



