function BFS(root, target){
  graph.reset()
  let queue = [];

  root.visited = true
  
  queue.push(root)
  while(queue.length > 0){
    let current = queue.shift()

    if(current == target) break
    
    let edges = current.neighbors
    
    for(let i = 0; i < edges.length; i++){
      let neighbor = edges[i]
      if(neighbor.visited) continue
      
      neighbor.visited = true
      neighbor.parent = current
      queue.push(neighbor)
    } 
  }
  
  path.push(graph.end)
  
  let next = target.parent

  while(next !== null){
    path.push(next)
    next = next.parent
  }
}

function simulateBFS(){

  path = []
  for (let i = 0; i < COUNT; i++) graph.nodes[i].findNeighbors();
  
  BFS(root, target);

  for (let k = 0; k < path.length - 1; k++) {
    strokeWeight(4);
    stroke(255);
    line(...path[k].coords(), ...path[k + 1].coords());
  }
  
}

function add_edge(p1, p2){
  stroke(255, 255, 0)
  strokeWeight(1)
  line(...p1.coords(), ...p2.coords());
}

function P2PLineCollision(p1, p2){
  for(const wall of obstacles){
    if(collideLineLine(...p1.coords(), ...p2.coords(), ...wall.coords)) return true
  }
  return false
}

function init_setup(){
  graph = new Graph();
  home = createVector(100, 100);
  goal = createVector(width - 100, height - 100)
  homeR = 12;

  obstacles.push(new Obstacle(400, 200, 500, 450));
  obstacles.push(new Obstacle(100, 150, 200, 100))
  // obstacles.push(new Obstacle(100, 400, 300, 200));
  // obstacles.push(new Obstacle(200, 600, 600, 600));
  // obstacles.push(new Obstacle(600, 400, 700, 200));
  obstacles.push(new Obstacle(25, 25, width - 25, 25));
  obstacles.push(new Obstacle(25, 25, 25, height - 25));
  obstacles.push(new Obstacle(width - 25, 25, width - 25, height - 25));
  obstacles.push(new Obstacle(25, height - 25, width - 25, height - 25));

  const angle1 = random(TWO_PI);
  const angle2 = random(TWO_PI);

  const x = home.x + 1 * cos(angle1);
  const y = home.y + 1 * sin(angle1);
  let r = new Vehicle(0, x, y, angle1);
  vehicles.push(r);
  graph.addNode(r)

  const a = goal.x + 1 * cos(angle2);
  const b = goal.y + 1 * sin(angle2);
  let t = new Vehicle(1, a, b, angle2);
  vehicles.push(t);
  graph.addNode(t)

  root = graph.nodes[0]
  target = graph.nodes[1]
  graph.setStart(root.index)
  graph.setEnd(target.index)

  for (let i = 2; i < COUNT; i++) {
    const angle = random(TWO_PI)
    const j = home.x + homeR * cos(angle);
    const k = home.y + homeR * sin(angle);
    let n = new Vehicle(i, j, k, angle)
    vehicles.push(n);
    graph.addNode(n)
  }

  food.push(goal);
}