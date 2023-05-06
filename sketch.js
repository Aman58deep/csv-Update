let index = 0;
let butterFlies = [];
let tagline;
function preload(){
  data = loadJSON("./data.json");
}
function setup() {
  // console.log(data);
  tagline=data["message"];
  
  createCanvas(windowWidth, windowHeight);
  setInterval(function () {
    if (butterFlies.length < 10) {
      let b = new Butterfly("special");
      if(random(1)<0.5){
      let c = new Butterfly("normal");
        butterFlies.push(c);
      }
      butterFlies.push(b);
    }
  }, 700);
  
  setInterval(()=>{
  data = loadJSON("data.json");
  },1000); //to update the data file every second;
  //however that doesn't wrok sometimees as browser cahes the data file stored
  
  backCol = [data["r"],data["g"],data["b"]]
}

function draw() {
  background(backCol);
  for (let i = 0; i < butterFlies.length; i++) {
    butterFlies[i].show();
    butterFlies[i].move();
    if (butterFlies[i].ypos < -50) {
      butterFlies.splice(i, 1);
      i--;
    }
  }
  stroke(240);
  strokeWeight(4);
  noFill();
  beginShape();
  vertex(0, 0);
  vertex(width, 0);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

class Butterfly {
  constructor(type = "normal", x, y) {
    this.type = type;
    this.yoff = random(1);
    this.sp = random(float(data["min-speed"]), float(data["max-speed"]));
    if (x && y) {
      this.xpos = mouseX;
      this.ypos = mouseY;
    } else {
      this.xpos = random(50, width - 50);
      this.ypos = random(height + 50, height + 100);
    }
    this.r = random(100, 255);
    this.g = random(100, 255);
    this.b = random(100, 255);
    this.r1 = random(255);
    this.g1 = random(255);
    this.b1 = random(255);
    this.Ydec = this.sp * 20;
    this.Xshift = random(-0.5, 0.5);
    this.size = 0.12;
    if (this.type != "normal") {
      this.index = index;
      index++;
      if (index == tagline.length) {
        index = 0;
      }
      if (tagline[this.index] != " ") {
        this.Ydec = float(data["word-fly-speed"]);
      }
    }
  }
  show() {
    textSize(50);
    textFont("Passion One");
    noStroke();
    stroke(240);
    strokeWeight(3);
    fill(this.r1, this.b1, this.g1);
    if (this.type != "normal") {
      text(tagline[this.index].toUpperCase(), this.xpos - 7, this.ypos + 30);
    }
    push();
    translate(this.xpos, this.ypos);
    scale(this.size);
    rotate(PI / 2);
    this.da = PI / 100;
    this.r = 200;
    this.dx = 0.1;
    stroke(0);
    fill(this.r, this.g, this.b);
    strokeWeight(2);
    beginShape();
    this.xoff = 0;
    for (var a = -PI / 2; a <= PI / 2; a += this.da) {
      this.n = noise(this.xoff, this.yoff);
      this.r = sin(2 * a) * map(this.n, 0, 1, 100, 250);
      this.x = this.r * cos(a);
      this.y = sin(frameCount * this.sp) * this.r * sin(a);
      this.xoff += this.dx;
      vertex(this.x, this.y);
    }

    for (let a = PI / 2; a < (3 * PI) / 2; a += this.da) {
      this.n = noise(this.xoff, this.yoff);
      this.r = sin(2 * a) * map(this.n, 0, 1, 100, 250);
      this.x = this.r * cos(a);
      this.y = sin(frameCount * this.sp) * this.r * sin(a);
      this.xoff -= this.dx;
      vertex(this.x, this.y);
    }
    endShape();
    pop();
  }
  move() {
    this.ypos -= this.Ydec;
    this.xpos += this.Xshift;
  }
}
function mousePressed(){
  let l=new Butterfly("normal",mouseX,mouseY);
  butterFlies.push(l);
}
