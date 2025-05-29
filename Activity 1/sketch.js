let cloudsPosition = [];

function setup() {
  createCanvas(800, 400);
  
  // Initialize cloud positions
  cloudsPosition = [
    { x: 100, y: 80 },
    { x: 300, y: 60 },
    { x: 500, y: 90 },
    { x: 700, y: 70 },
    { x: 900, y:100},
  ];
}

function draw() {
  drawSky();
  drawBackground();
  moveAndDrawClouds();
  drawCar(250, 260);

}

function drawSky() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(255, 140, 105), color(50, 30, 80), inter);
    stroke(c);
    line(0, y, width, y);
  }
}


function drawBackground() {
  // Sky

  // Ground
  fill(50);
  rect(0, height - 100, width, 100);

  // Road lines
  stroke(255);
  strokeWeight(4);
  for (let i = 0; i < width; i += 40) {
    line(i, height - 50, i + 20, height - 50);
  }

  noStroke();
}

function moveAndDrawClouds() {
  for (let cloud of cloudsPosition) {
    drawCloud(cloud.x, cloud.y);
    cloud.x += 0.5; // Cloud speed

    // Loop cloud to the left when it goes off screen
    if (cloud.x > width + 60) {
      cloud.x = -100;
    }
  }
}

function drawCloud(x, y) {
  fill(200,200,200);
  noStroke();
  ellipse(x, y, 60, 60);
  ellipse(x + 30, y - 10, 60, 60);
  ellipse(x + 60, y, 60, 60);
  ellipse(x + 30, y + 10, 70, 60);
}

function drawCar(x, y) {
  // Shadow
  fill(0, 50);
  ellipse(x + 75, y + 40, 160, 20);

  // Car body
  fill('#FF4C4C');
  rect(x, y, 150, 40, 10);
  rect(x + 20, y - 30, 110, 30, 10, 10, 0, 0);

  // Windows
  fill('#AEEEEE');
  rect(x + 30, y - 25, 35, 25, 5);
  rect(x + 85, y - 25, 35, 25, 5);

  // Door line
  stroke(80);
  strokeWeight(2);
  line(x + 75, y - 30, x + 75, y + 10);
  noStroke();

  // Wheels
  fill(30);
  ellipse(x + 35, y + 40, 35, 35);
  ellipse(x + 115, y + 40, 35, 35);
  fill(100);
  ellipse(x + 35, y + 40, 15, 15);
  ellipse(x + 115, y + 40, 15, 15);

  // Headlights
  drawHeadlight(x + 150, y + 10); // Right front
  drawHeadlight(x + 150, y + 30); // Right bottom
}

function drawHeadlight(x, y) {
  // Softer glow (reduced brightness and transparency)
  noStroke();
  fill(255, 255, 150, 30); // lower alpha for subtle glow
  for (let i = 1; i <= 3; i++) {
    ellipse(x + i * 8, y, 30 + i * 8, 15 + i * 3);
  }

  // Dimmer beam
  fill(255, 255, 180, 180); // slightly less intense center
  ellipse(x, y, 8, 8);
}

