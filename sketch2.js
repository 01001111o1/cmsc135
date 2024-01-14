let vehicles = [], pheromones = [], obstacles = [], food = [];
let home, homeR;
let frames = 60, maxRange = 60;
let COUNT = 2

function setup() {
  createCanvas(800, 800);
  frameRate(frames)
  
  AntSetup();

}

function draw() {
  background(210);
  stroke(220);
  noFill();

  drawAnts();

}

