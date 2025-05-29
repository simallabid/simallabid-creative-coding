let lightColors = [
  "#FF80AB","#FFD54F","#80DEEA","#A5D6A7","#CE93D8","#FFAB91","#F48FB1","#81D4FA" 
];



function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  noStroke();
  drawPattern();
}

function draw() {
  // intentionally empty
}

function drawPattern() {
  background("#1A1A1A"); 

  let cols = 10;
  let rows = 10;
  let w = width / cols;
  let h = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w + w / 2;
      let y = j * h + h / 2;

      push();
      translate(x, y);
      let choice = int(random(3));
      let c = random(lightColors);
      fill(c);

      switch (choice) {
        case 0:
          drawHeart(w * 0.2);
          break;
        case 1:
          drawStar(w * 0.15);
          break;
        case 2:
          drawCloud(w * 0.25);
          break;
      }
      pop();
    }
  }
}

function drawHeart(size) {
  beginShape();
  vertex(0, -size / 2);
  bezierVertex(size / 2, -size, size, -size / 4, 0, size);
  bezierVertex(-size, -size / 4, -size / 2, -size, 0, -size / 2);
  endShape(CLOSE);
}

function drawStar(radius) {
  let angle = TWO_PI / 5;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = cos(a) * radius;
    let sy = sin(a) * radius;
    vertex(sx, sy);
    sx = cos(a + halfAngle) * (radius / 2);
    sy = sin(a + halfAngle) * (radius / 2);
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawCloud(size) {
  noStroke();
  ellipse(0, 0, size * 1.2, size * 0.8);        
  ellipse(-size * 0.6, 0, size * 0.9, size * 0.7); 
  ellipse(size * 0.6, 0, size * 0.9, size * 0.7);  
  ellipse(-size * 0.3, -size * 0.3, size * 0.8, size * 0.8);
  ellipse(size * 0.3, -size * 0.3, size * 0.8, size * 0.8);
}


function mousePressed() {
  drawPattern();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawPattern();
}
