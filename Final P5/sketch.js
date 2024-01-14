let COUNT = 10, MAX_DIST = 100, frames = 30, maxRange = 60;
let home, homeR;
let path = [], obstacles = [], paths = []
let vehicles = [], pheromones = [], food = [];
let graph, current, root, target
let DEFAULT_DIAMETER = 12

function setup() {
  createCanvas(300, 300);
  frameRate(frames)
  init_setup();

}

function draw() {
  background(150);

  simulateBFS()
  strokeWeight(1)

  drawAnts();

  for(let i = 0; i < paths.length; i++){
    for(let j = 0; j < paths[i].length - 1; j++){
      stroke(255)
      strokeWeight(4)
      line(...paths[i][j], ...paths[i][j + 1])
    }
  }
  
  


}
