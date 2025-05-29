let years = [
  "2014", "2015", "2016", "2017", "2018", 
  "2019", "2020", "2021", "2022", "2023"
];

let tourists = [
  19.70, 21.40, 22.90, 24.60, 25.50, 
  27.10, 14.90, 19.20, 25.20, 28
];

let colors = ['#2B6CA3', '#35A28B', '#7BC96F', '#FFCE56', '#FF9F40', '#D1D5DB', '#A78BFA', '#F472B6', '#60A5FA', '#34D399'];
let maxVal;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  maxVal = max(tourists);
  noLoop();
  textAlign(CENTER, CENTER);
}

function draw() {
  background('#F1E5D1');

  // Title
  fill('#1E1E2F');
  textSize(32);
  text("UAE Tourist Analysis (2014–2023)", width / 2, 50);
  textSize(16);
  fill(100);
  text("Tourist arrivals in millions", width / 2, 80);

  let chartHeight = height - 250;
  let chartWidth = 500;
  let barWidth = 30;
  let spacing = 40;
  let startX = (width - ((barWidth + spacing) * years.length - spacing)) / 2;
  let bottom = height - 100;
  let cornerRadius = 20;

  // Draw bars
  for (let i = 0; i < tourists.length; i++) {
    let value = tourists[i];
    let barHeight = map(value, 0, maxVal, 0, chartHeight);

    // Background bar
    fill(255);
    noStroke();
    rect(startX + i * (barWidth + spacing), bottom - chartHeight, barWidth, chartHeight, cornerRadius);

    // Colored bar
    fill(colors[i]);
    rect(startX + i * (barWidth + spacing), bottom - barHeight, barWidth, barHeight, cornerRadius);

    // Value text
    fill(0);
    textSize(12);
    text(nf(value, 1, 1) + "M", startX + i * (barWidth + spacing) + barWidth / 2, bottom - barHeight - 15);

    // Year label
    textSize(12);
    text(years[i], startX + i * (barWidth + spacing) + barWidth / 2, bottom + 15);
  }
}

function mouseClicked() {
  // Change colors array to new random colors
  for (let i = 0; i < colors.length; i++) {
    colors[i] = color(random(50, 255), random(50, 255), random(50, 255)).toString('#rrggbb');
  }
  redraw();
}
