let bgImage;
let startScreenImage;
let splashImage;
let fruitImages = [];
let fruits = [];
let halves = [];
let splatters = [];
let bladeTrail = [];
let score = 0;
let lives = 3;
let gameOver = false;
let gameStarted = false;
let gameStartTime;
let difficultyFactor = 1;
let isPaused = false;

// Audio
let bgMusic;
let throwSound;
let throwBombSound;
let sliceSound;
let startSound;
let bombSound;
let gameOverSound;
let gameOverSoundPlayed = false;

let showBoom = false;
let boomStartTime = 0;
let boomImage;
let boomX = 0;
let boomY = 0;
let lastBombTime = 0;

// Custom font
let myFont;

//Loads images, sound effects, background music, and custom font before the game starts.
function preload() {
  bgImage = loadImage("bg.png");
  startScreenImage = loadImage("fruit ninja.jpg");
  splashImage = loadImage("splash.png");
  boomImage = loadImage("bomb.png");

  let fruitNames = [
    "Watermelon.png", "Tomato.png", "Strawberry.png", "Red_Apple.png",
    "Pumpkin.png", "Plum.png", "Pineapple.png", "Pear.png", "Peach.png",
    "Passionfruit.png", "Orange.png", "Mango.png", "Lime.png", "Kiwi_Fruit.png",
    "Green_Apple.png", "Cherry.png", "Banana.png", "Coconut.png"
  ];

  for (let name of fruitNames) {
    fruitImages.push(loadImage(name));
  }

  bgMusic = loadSound("bg-song.mp3");
  throwSound = loadSound("throw.mp3");
  throwBombSound = loadSound("throwbomb.mp3");
  sliceSound = loadSound("cut.mp3");
  startSound = loadSound("start-song.mp3");
  bombSound = loadSound("bomb.mp3");
  gameOverSound = loadSound("gameover.mp3");

  myFont = loadFont("go3v2.ttf");
}

//Initializes the canvas, sets the font, and starts looping background music.
function setup() {
  createCanvas(1280, 720);
  textFont(myFont);
  bgMusic.setVolume(0.5);
  bgMusic.loop();
}

//Draws an image covering the whole canvas proportionally, with optional screen shake (used for bomb effects).
function drawBackgroundCover(img, shake = false) {
  imageMode(CORNER);
  let canvasAspect = width / height;
  let imgAspect = img.width / img.height;
  let drawWidth, drawHeight;

  if (canvasAspect > imgAspect) {
    drawWidth = width;
    drawHeight = width / imgAspect;
  } else {
    drawHeight = height;
    drawWidth = height * imgAspect;
  }

  let x = (width - drawWidth) / 2;
  let y = (height - drawHeight) / 2;

  if (shake) {
    x += random(-10, 10);
    y += random(-10, 10);
  }

  image(img, x, y, drawWidth, drawHeight);
}

//Handles game logic and drawing
function draw() {
  background(30);

  if (!gameStarted) {
    drawBackgroundCover(startScreenImage);
    textAlign(CENTER, CENTER);
    textSize(48);
    stroke(28, 44, 67);
    strokeWeight(4);
    fill(255);
    text("Click to Start", width / 2, height / 2 + 124);
    return;
  }

  if (isPaused) {
    drawBackgroundCover(bgImage);
    drawPauseButton();
    fill(255);
    textSize(60);
    textAlign(CENTER, CENTER);
    text("Paused", width / 2, height / 2);
    return;
  }

  let isBooming = showBoom && millis() - boomStartTime < 3000;
  drawBackgroundCover(bgImage, isBooming);
  drawPauseButton();

  bladeTrail.push({ x: mouseX, y: mouseY, time: millis() });
  bladeTrail = bladeTrail.filter(p => millis() - p.time < 200);

  if (!gameOver || isBooming) {
    let elapsed = (millis() - gameStartTime) / 1000;
    difficultyFactor = 1 + elapsed / 50;

    let timeFactor = isBooming ? 0.2 : 1;

    if (!isBooming && fruits.length < 5) {
      if (random(1) < 0.01 * difficultyFactor) {
        fruits.push(new Fruit());
        throwSound.play();
      }

      if (millis() - lastBombTime >= 3000) {
        fruits.push(new Fruit(true));
        throwBombSound.play(); // PLAY bomb throw sound
        lastBombTime = millis();
      }
    }

    for (let i = fruits.length - 1; i >= 0; i--) {
      let fruit = fruits[i];
      if (!fruit) continue;

      fruit.move(timeFactor);
      fruit.show();

      if (!isBooming && fruit.clicked(mouseX, mouseY)) {
        if (fruit.isBomb) {
          bombSound.play();
          boomX = fruit.x;
          boomY = fruit.y;
          showBoom = true;
          boomStartTime = millis();
          fruits = [];
          lives = 0;
          gameOver = true;
        } else {
          let sliced = fruit.split();
          halves.push(...sliced);
          splatters.push(new Splatter(fruit.x, fruit.y, fruit.color));
          fruits.splice(i, 1);
          score += 10;
          sliceSound.play();
        }
        continue;
      }

      if (!isBooming && fruit.offScreen()) {
        if (!fruit.isBomb) {
          lives--;
          if (lives <= 0) {
            gameOver = true;
            if (!gameOverSoundPlayed) {
              gameOverSound.play();
              gameOverSoundPlayed = true;
            }
          }
        }
        fruits.splice(i, 1);
      }
    }

    for (let h of halves) {
      h.move(timeFactor);
      h.show();
    }

    for (let s of splatters) {
      s.show();
    }

    drawBladeTrail();

    fill(255);
    textSize(40);
    textAlign(LEFT);
    text("Score: " + score, 20, 30);
    text("Lives: " + lives, 20, 80);
  }

  if (showBoom && millis() - boomStartTime < 3000) {
    imageMode(CENTER);
    push();
    translate(boomX, boomY);
    tint(255, 100);
    image(boomImage, 0, 0, 600, 600);
    pop();

    push();
    translate(boomX + random(-10, 10), boomY + random(-10, 10));
    rotate(random(-0.1, 0.1));
    image(boomImage, 0, 0, 200, 200);
    pop();
  }

  if (gameOver && (!showBoom || millis() - boomStartTime >= 3000)) {
    fill(255, 0, 0);
    textSize(100);
    textAlign(CENTER, CENTER);
    text("Game Over\nScore: " + score + "\nClick to Restart", width / 2, height / 2);
  }
}

//Draws pause/play icon in the top-right corner.
function drawPauseButton() {
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(width - 60, 20, 40, 40, 8);
  fill(0);
  noStroke();
  if (isPaused) {
    triangle(width - 50, 30, width - 50, 50, width - 30, 40);
  } else {
    rect(width - 48, 28, 6, 24);
    rect(width - 36, 28, 6, 24);
  }
}

//Performs function when mouse is clicked.
function mousePressed() {
  if (!gameStarted) {
    gameStarted = true;
    gameStartTime = millis();
    startSound.play();
    return;
  }

  if (mouseX > width - 60 && mouseX < width - 20 && mouseY > 20 && mouseY < 60) {
    isPaused = !isPaused;
    return;
  }

  if (gameOver && (!showBoom || millis() - boomStartTime >= 3000)) {
    score = 0;
    lives = 3;
    fruits = [];
    halves = [];
    splatters = [];
    gameOver = false;
    showBoom = false;
    gameStartTime = millis();
    difficultyFactor = 1;
    lastBombTime = millis();
    gameOverSoundPlayed = false;
    startSound.play();
  }
}

//raws a fading curved trail following the mouse pointer to simulate a blade slice effect.
function drawBladeTrail() {
  if (bladeTrail.length < 2) return;

  strokeWeight(20);
  noFill();
  beginShape();
  for (let i = 0; i < bladeTrail.length; i++) {
    let pt = bladeTrail[i];
    let age = millis() - pt.time;
    let alpha = map(age, 0, 200, 150, 0);
    let hue = map(i, 0, bladeTrail.length - 1, 190, 220);
    stroke(color(`hsla(${hue}, 100%, 60%, ${alpha / 255})`));
    curveVertex(pt.x, pt.y);
  }
  endShape();

  strokeWeight(6);
  stroke(255, 255, 255, 200);
  noFill();
  beginShape();
  for (let i = 0; i < bladeTrail.length; i++) {
    let pt = bladeTrail[i];
    curveVertex(pt.x, pt.y);
  }
  endShape();
}

//Represents a fruit or bomb:
class Fruit {
  constructor(forceBomb = false) {
    this.r = 40;
    this.x = random(100, width - 100);
    this.y = height + this.r;
    this.speedY = random(-13, -16) * difficultyFactor;
    this.speedX = random(-2, 2) * difficultyFactor;
    this.isBomb = forceBomb;
    this.img = this.isBomb ? boomImage : random(fruitImages);
    this.color = color(random(255), random(255), random(255));
  }

  move(factor = 1) {
    this.x += this.speedX * factor;
    this.y += this.speedY * factor;
    this.speedY += 0.5 * factor;
  }

  show() {
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.r * 2, this.r * 2);
  }

  offScreen() {
    return this.y > height + this.r;
  }

  clicked(mx, my) {
    return dist(mx, my, this.x, this.y) < this.r;
  }

  split() {
    let half1 = new FruitHalf(this.x - 15, this.y, this.img, -3, -5);
    let half2 = new FruitHalf(this.x + 15, this.y, this.img, 3, -5);
    return [half1, half2];
  }
}

//Represents half of a sliced fruit and moves under gravity and rotates slightly for realism.
class FruitHalf {
  constructor(x, y, img, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.img = img;
    this.r = 25;
  }

  move(factor = 1) {
    this.x += this.vx * factor;
    this.y += this.vy * factor;
    this.vy += 0.4 * factor;
  }

  show() {
    imageMode(CENTER);
    push();
    translate(this.x, this.y);
    rotate(this.vx * 0.05);
    image(this.img, 0, 0, this.r * 2, this.r);
    pop();
  }
}

//Shows a fruit-colored splash effect when a fruit is sliced and then fades away over time.
class Splatter {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.alpha = 255;
    this.size = 80;
    this.angle = random(TWO_PI);
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    tint(red(this.col), green(this.col), blue(this.col), this.alpha);
    imageMode(CENTER);
    image(splashImage, 0, 0, this.size, this.size);
    this.alpha -= 5;
    pop();
  }
}
