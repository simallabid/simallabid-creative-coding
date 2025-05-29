let img;

function preload() {
  img = loadImage('image.jpg'); 
}

function setup() {
  createCanvas(img.width, img.height);
  noStroke();
}

function draw() {
  background(220);
  image(img, 0, 0);

  // Check if mouse is over the image
  if (mouseX >= 0 && mouseX < img.width && mouseY >= 0 && mouseY < img.height) {
    let c = img.get(mouseX, mouseY); // Get the pixel color at mouse position
    fill(c);
    circle(mouseX, mouseY, 80); // Draw circle filled with that color
  }
}
