function keyPressed(){
  let p = new Point(graph.nodes.length, mouseX, mouseY)
  graph.addNode(p)
  return false;
}

function BFS(root, target){
  graph.reset()
  let queue = [];

  root.visited = true
  
  queue.push(root)
  while(queue.length > 0){
    let current = queue.shift()

    if(current == target){
      break
    }
    
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

function simulateBFS(r, t){

  path = []

  for (let i = 0; i < graph.nodes.length; i++) graph.nodes[i].findNeighbors();

  let root = graph.setStart(r);
  let target = graph.setEnd(t);

  BFS(root, target);

  for (let k = 0; k < path.length - 1; k++) {

    path[k].color = color(255, 0, 0)
    path[k].diameter = PATH_DIAMETER
    path[k].continueMoving = false
    if(k == path.length - 2){
      path[k + 1].color = color(255, 0, 0)
      path[k + 1].diameter = PATH_DIAMETER
      path[k + 1].continueMoving = false
    }
    strokeWeight(4);
    stroke(255, 255, 255);
    line(...path[k].get_coordinates(), ...path[k + 1].get_coordinates());
  }
  
}

function init_maze(){
  cols = floor(width / w);
  rows = floor(height / w);

for(let i = 0; i < rows; i++){
  grid.push([])
  for(let j = 0; j < cols; j++){
    grid[i].push(new Cell(i, j))
  }
}
current = grid[0][0]
}

function generate_maze(){

  while(count < rows * cols){
      if(!current.visited) count++

      current.visited = true

      let next = current.getNext();
      
      if(next !== undefined){
          
          stack.push(current);
          current.removeWalls(next);
          current = next;

      }else if (stack.length > 0){
          current = stack.pop();
      }
  }

  find_walls()
}

function find_walls(){

  for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      
            let g = grid[i][j]
            let x = g.x * w
            let y = g.y * w

            if(g.walls[0]) walls.push([x, y, x + w, y]);
            if(g.walls[1]) walls.push([x + w, y, x + w, y + w]);
            if(g.walls[2]) walls.push([x + w, y + w, x, y + w]);
            if(g.walls[3]) walls.push([x, y + w, x, y]);            

    }
  }
}

function display_maze(){
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      grid[i][j].show()
    }
  }
}

function distance(p1, p2){
  return dist(...p1.get_coordinates(), ...p2.get_coordinates());
}

function add_edge(p1, p2){
  stroke(196, 180, 84)
  let params = [...p1.get_coordinates(), ...p2.get_coordinates()]
  line(...params);
}

// function P2PLineCollision(p1, p2){
//   for(let i = 0; i < walls.length; i++){
//     let [x, y, x2, y2] = walls[i]
//     if(collideLineRect(...p1.get_coordinates(), ...p2.get_coordinates(), x, y, x2 - x, y2 - y) === true) return true
//   }
//   return false
// }

