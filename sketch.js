let vehicles = [], pheromones = [], obstacles = [], food = [];
let home, homeR;
let frames = 60, maxRange = 60;
let COUNT = 3

function setup() {
  createCanvas(800, 800);
  frameRate(frames)
  
  home = createVector(100, 100);
  homeR = 12;

  obstacles.push(new Obstacle(400, 200, 500, 450));
  obstacles.push(new Obstacle(100, 400, 300, 200));
  obstacles.push(new Obstacle(200, 600, 600, 600));
  obstacles.push(new Obstacle(25, 25, width - 25, 25));
  obstacles.push(new Obstacle(25, 25, 25, height - 25));
  obstacles.push(new Obstacle(width - 25, 25, width - 25, height - 25));
  obstacles.push(new Obstacle(25, height - 25, width - 25, height - 25));
  
  for (let i = 0; i < COUNT; i++) {
    const angle = random(TWO_PI);
    const x = home.x + homeR * cos(angle);
    const y = home.y + homeR * sin(angle);
    vehicles.push(new Vehicle(i, x, y, angle));
  }
}

function draw() {
  background(210);

  stroke(220);
  noFill();
  rect(25, 25, width-50, height-50);

  for (const f of food) {
    noStroke();
    fill(0, 255, 0);
    circle(f.x, f.y, 4);
  }

  for (let i = pheromones.length - 1; i >= 0; i--) {
    const p = pheromones[i];
    for (let n = 0; n < 3; n++) p.update();
    p.render();
    if (p.strength < 0) pheromones.splice(i, 1);
  }

  for (let n = 0; n < 3; n++) {
    for (let i = vehicles.length - 1; i >= 0; i--) {
      const v = vehicles[i];
      v.applyBehaviors();
      v.update();
      v.wrapAround()
      if (v.pos.dist(home) < homeR) {
        v.reset();
      }
    }
    frames++;
  }
  
  for (const v of vehicles) v.render();

  for(let i = 0; i < obstacles.length; i++) obstacles[i].renderObstacle();

  stroke(255, 255, 0);
  fill(255, 255, 0);
  circle(home.x, home.y, homeR * 2);
}

