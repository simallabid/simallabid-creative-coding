function setup() {
  createCanvas(400, 400);
  background('#ADD8E6');

  // House walls
  fill('beige'); // Light brown
  stroke(0);
  rect(100, 175, 200, 125);

  // Roof
  fill('darkblue'); // Dark red
  triangle(100, 175, 200, 100, 300, 175);

  // Left Window
  fill('#ADD8E6'); // Light blue
  rect(125, 200, 35, 35);

  // Right Window
  fill('#ADD8E6');
  rect(240, 200, 35, 35);

  // Door
  fill('#654321'); // Brown
  arc(200, 255, 60, 90, PI, 0);
  rect(170, 255, 60, 45);
  
  // Doorknob
  fill('silver');
  ellipse(215, 275, 5, 5);

  // Chimney
  fill('darkblue'); // Brick red
  rect(260, 90, 40, 85);
}