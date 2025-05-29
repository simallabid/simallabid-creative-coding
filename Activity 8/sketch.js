let size = 30;
let num = 10;
let grid = [];
let min = 150;

let song;
let fft;
let spectrum = [];
let distFromCenter = [];

let autoRotX = 0;
let autoRotY = 0;
let lastMouseMovedTime = 0;
let userControl = false;
let isPlaying = true;

function preload() {
  song = loadSound("music.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  song.play();
  fft = new p5.FFT();

  for (let i = 0; i < num; i++) {
    grid[i] = [];
    for (let j = 0; j < num; j++) {
      grid[i][j] = [];
      for (let k = 0; k < num; k++) {
        grid[i][j][k] = floor(random(2));

        let offset = -((num - 1) * size) / 2;
        let x = i * size + offset;
        let y = j * size + offset;
        let z = k * size + offset;
        let distance = dist(x, y, z, 0, 0, 0);

        distFromCenter.push({ i, j, k, distance });
      }
    }
  }

  distFromCenter.sort(compareDistances);
}

function compareDistances(a, b) {
  return a.distance - b.distance;
}

function draw() {
  background(0);

  let timeSinceMove = millis() - lastMouseMovedTime;
  userControl = timeSinceMove < 2000;

  let rotX, rotY;
  if (userControl) {
    rotX = map(mouseY, 0, height, -PI, PI) * 0.5;
    rotY = map(mouseX, 0, width, -PI, PI) * 0.5;
    autoRotX = rotX;
    autoRotY = rotY;
  } else {
    autoRotX += 0.005;
    autoRotY += 0.007;
    rotX = autoRotX;
    rotY = autoRotY;
  }

  rotateX(rotX);
  rotateY(rotY);

  spectrum = fft.analyze();
  let vol = fft.getEnergy(20, 140);

  if (vol > 220) {
    stroke(200, 180, 0, 100);
  } else {
    stroke(255, 40);
  }

  let totalCubes = num * num * num;
  for (let i = 0; i < totalCubes; i++) {
    let pos = distFromCenter[i];
    let c = map(spectrum[i], 0, 255, min, 255);
    grid[pos.i][pos.j][pos.k] = c;
  }

  let offset = -((num - 1) * size) / 2;
  translate(offset, offset, offset);
  noFill();

  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      for (let k = 0; k < num; k++) {
        if (grid[i][j][k] > min) {
          fill(grid[i][j][k], 0, 200);
        } else {
          noFill();
        }

        push();
        translate(i * size, j * size, k * size);
        box(size - size / 4);
        pop();
      }
    }
  }
}

function mouseMoved() {
  lastMouseMovedTime = millis();
}

function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
    isPlaying = false;
  } else {
    song.play();
    isPlaying = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
