let img;

function preload() {
  img = loadImage('image.jpg'); 
}

function setup() {
  createCanvas(img.width, img.height);
  background(255);

  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;

      // Get original colors
      let r = img.pixels[index + 0];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      // Posterize colors by reducing to 3 levels per channel
      r = floor(r / 85) * 85;
      g = floor(g / 85) * 85;
      b = floor(b / 85) * 85;

      // Set new color values
      img.pixels[index + 0] = r;
      img.pixels[index + 1] = g;
      img.pixels[index + 2] = b;
    }
  }

  img.updatePixels();

  image(img, 0, 0);  
}

function draw() {
}
