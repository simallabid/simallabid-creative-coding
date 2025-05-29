let img;
let particles = [];
let spacing = 12; // Controls grid spacing (lower = more particles)
let repulsionRadius = 40;

function preload() {
  img = loadImage("image.png");
}

function setup() {
  createCanvas(1000,1000);
  imageMode(CENTER);
  noStroke();
  noCursor(); // Hides the default cursor

  img.loadPixels();

  // Create particles based on the image
  for (let y = 0; y < img.height; y += spacing) {
    for (let x = 0; x < img.width; x += spacing) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let a = img.pixels[index + 3];

      if (a > 128) {
        let posX = x + width / 2 - img.width / 2;
        let posY = y + height / 2 - img.height / 2;
        particles.push(new Particle(posX, posY, color(r, g, b, a)));
      }
    }
  }
}

function draw() {
  background(0);

  for (let p of particles) {
    p.update();
    p.show();
  }

  fill(255);
  noStroke();
  ellipse(mouseX, mouseY, 14, 14); //Custom cursor size here
}

class Particle {
  constructor(x, y, col) {
    this.home = createVector(x, y);
    this.pos = this.home.copy();
    this.vel = createVector();
    this.acc = createVector();
    this.color = col;
    this.size = spacing;
  }

  applyRepulsion() {
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(this.pos, mouse);
    let d = dir.mag();

    if (d < repulsionRadius) {
      dir.normalize();
      dir.mult(4);
      this.acc.add(dir);
    }
  }

  update() {
    this.applyRepulsion();

    let homeForce = p5.Vector.sub(this.home, this.pos);
    homeForce.mult(0.05);
    this.acc.add(homeForce);

    this.vel.add(this.acc);
    this.vel.mult(0.9); // Friction
    this.pos.add(this.vel);
    this.acc.mult(0);   // Reset acceleration
  }

  show() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}
