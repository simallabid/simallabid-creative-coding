let pg;
let customFont;
let glassRadius = 250;
let glassDisplayRadius = 150;
let quotes = [
  "You are enough just as you are.",
  "Believe in yourself and all that you are.",
  "Inhale confidence, exhale doubt.",
  "You’re stronger than you think.",
  "Your potential is endless."
];
let positions = [];
let colors = [];

let stars = [];

function preload() {
  customFont = loadFont("DancingScript-VariableFont_wght.ttf");
}

function setup() {
  createCanvas(1000, 1000);
  textAlign(CENTER, CENTER);
  textFont(customFont);

  pg = createGraphics(width, height);
  pg.textAlign(CENTER, CENTER);
  pg.textFont(customFont);

  // Add stars
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      alpha: random(100, 255),
      speed: random(0.5, 1)
    });
  }

  let radius = 300;
  let centerX = width / 2;
  let centerY = height / 2;

  for (let i = 0; i < quotes.length; i++) {
    let angle = map(i, 0, quotes.length, 0, TWO_PI);
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    positions.push({ x, y });
    colors.push(color(random(180, 255), random(180, 255), random(180, 255)));
  }
}

function draw() {
  background(0);

  // Draw stars
  for (let s of stars) {
    noStroke();
    fill(255, s.alpha);
    ellipse(s.x, s.y, s.size);
    s.alpha += random(-5, 5);
    s.alpha = constrain(s.alpha, 100, 255);
  }

  pg.clear();

  let mx = constrain(mouseX, glassDisplayRadius / 2, width - glassDisplayRadius / 2);
  let my = constrain(mouseY, glassDisplayRadius / 2, height - glassDisplayRadius / 2);

  for (let i = 0; i < quotes.length; i++) {
    let pos = positions[i];
    let col = colors[i];
    let quote = quotes[i];

    let d = dist(mx, my, pos.x, pos.y);
    let isHovered = d < glassRadius / 2;

    // Glow around big circles
    push();
    noFill();
    stroke(255);
    strokeWeight(6);
    for (let blur = 60; blur >= 20; blur -= 15) {
      drawingContext.shadowBlur = blur;
      drawingContext.shadowColor = `rgba(255,255,255,${map(blur, 20, 60, 0.15, 0.6)})`;
      ellipse(pos.x, pos.y, glassRadius);
    }
    drawingContext.shadowBlur = 0;
    pop();

    // Draw big circle
    fill(20);
    stroke(60);
    strokeWeight(3);
    ellipse(pos.x, pos.y, glassRadius);

    if (isHovered) {
      pg.push();
      pg.translate(pos.x, pos.y);

      let maxWidth = glassRadius * 0.85;
      let fontSize = 28;
      pg.textSize(fontSize);

      while (pg.textWidth(quote) > maxWidth && fontSize > 10) {
        fontSize -= 1;
        pg.textSize(fontSize);
      }

      let wrapped = wrapText(pg, quote, maxWidth);
      let lineHeight = fontSize * 1.3;
      let startY = -((wrapped.length - 1) * lineHeight) / 2;

      for (let blur = 90; blur >= 30; blur -= 30) {
        pg.drawingContext.shadowBlur = blur;
        pg.drawingContext.shadowColor = col;
        pg.fill(col);
        for (let j = 0; j < wrapped.length; j++) {
          pg.text(wrapped[j], 0, startY + j * lineHeight);
        }
      }
      pg.pop();
    }
  }

  // ---- MAGNIFYING GLASS ZOOM ----
  let zoom = 1.6;
  let zoomed = pg.get(
    mx - glassDisplayRadius / (2 * zoom),
    my - glassDisplayRadius / (2 * zoom),
    glassDisplayRadius / zoom,
    glassDisplayRadius / zoom
  );

  zoomed.resize(glassDisplayRadius, glassDisplayRadius);

  let maskCanvas = createGraphics(glassDisplayRadius, glassDisplayRadius);
  maskCanvas.background(0);
  maskCanvas.noStroke();
  maskCanvas.fill(255);
  maskCanvas.ellipse(glassDisplayRadius / 2, glassDisplayRadius / 2, glassDisplayRadius);

  zoomed.mask(maskCanvas);

  imageMode(CENTER);

  // Glow around magnifying glass
  push();
  noFill();
  stroke(255);
  strokeWeight(6);
  for (let blur = 60; blur >= 20; blur -= 15) {
    drawingContext.shadowBlur = blur;
    drawingContext.shadowColor = `rgba(255,255,255,${map(blur, 20, 60, 0.15, 0.6)})`;
    ellipse(mx, my, glassDisplayRadius);
  }
  drawingContext.shadowBlur = 0;
  pop();

  // Magnifying glass outline and handle
  push();
  translate(mx, my);
  noFill();
  stroke(255, 230);
  strokeWeight(6);
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = color(180, 255, 255, 100);
  ellipse(0, 0, glassDisplayRadius);

  strokeWeight(10);
  stroke(180, 230, 255, 200);
  line(glassDisplayRadius / 2 * 0.7, glassDisplayRadius / 2 * 0.7, glassDisplayRadius * 0.8, glassDisplayRadius * 0.8);

  noStroke();
  fill(180, 230, 255, 150);
  ellipse(glassDisplayRadius * 0.8, glassDisplayRadius * 0.8, 30);
  pop();

  image(zoomed, mx, my);
}

function wrapText(pg, txt, maxWidth) {
  let words = txt.split(" ");
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    let testLine = currentLine + " " + words[i];
    if (pg.textWidth(testLine) < maxWidth) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = words[i];
    }
  }
  lines.push(currentLine);
  return lines;
}
