let smokeY = 90;
let smokeOffset = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('#ADD8E6'); // Light blue sky

  // House walls
  fill('beige');
  stroke(0);
  rect(100, 175, 200, 125);

  // Roof
  fill('darkblue');
  triangle(100, 175, 200, 100, 300, 175);

  // Left Window
  fill('#ADD8E6');
  rect(125, 200, 35, 35);

  // Right Window
  fill('#ADD8E6');
  rect(240, 200, 35, 35);

  // Door
  fill('#654321');
  arc(200, 255, 60, 90, PI, 0);
  rect(170, 255, 60, 45);

  // Doorknob
  fill('silver');
  ellipse(215, 275, 5, 5);

  // Chimney
  fill('darkblue');
  rect(260, 90, 40, 85);

  // Animated Smoke
  fill(30, 30, 30, 180); // Light grey semi-transparent
  noStroke();
  for (let i = 0; i < 4; i++) {
    ellipse(280 + sin(smokeOffset + i) * 10, smokeY - i * 20, 20, 20);
  }

  smokeY -= 0.5;
  smokeOffset += 0.05;

  if (smokeY < 0) {
    smokeY = 90;
    smokeOffset = 0;
  }
}