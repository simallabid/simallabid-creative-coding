function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(193, 232, 255); 

  stroke(0); // black outline
  strokeWeight(2);
  fill(84, 131, 179); 

  // antennas
  rectMode(CENTER);

// Limit how much the anrenas move
let antennaOffset = constrain((mouseX - width / 2) / 20, -10, 10);

// left antenna
push();
translate(antennaOffset, 0);
rect(320 - 30, 180 - 80, 15, 75); 
pop();

// right antenna
push();
translate(-antennaOffset, 0);
rect(320 + 30, 180 - 80, 15, 75); 
pop();

// antenna balls
fill(1, 56, 87); 
circle(320 - 30 + antennaOffset, 180 - 120, 25);
circle(320 + 30 - antennaOffset, 180 - 120, 25);


  // head
  fill(138, 174, 224);
  circle(320, 180, 150);

  // eyes (white parts)
  fill(255);
  circle(320 - 30, 180 - 15, 40);
  circle(320 + 30, 180 - 15, 40);
  circle(320 + 30, 180 - 25, 50);
  circle(320 - 30, 180 - 25, 50);

  // pupils
  let pupilOffset = constrain((mouseX - width / 2) / 30, -6, 6);
  fill(57, 88, 134);
  circle(320 + 30 - 10 + pupilOffset, 180 - 35, 10);
  circle(320 - 30 - 10 + pupilOffset, 180 - 35, 10);


  // mouth
  noFill();
  arc(320, 190, 25, 25, 0, PI);

  // Floating collar using bezierVertex()
  push();
  translate(320, 250); // below the head
  scale(1); 
  rotate(0);
  noStroke();
  fill(100, 170, 220, 100);

  beginShape();
  vertex(-60, 0);
  bezierVertex(-40, 20, 40, 20, 60, 0);
  bezierVertex(40, 30, -40, 30, -60, 0);
  endShape(CLOSE);
  pop();
}
