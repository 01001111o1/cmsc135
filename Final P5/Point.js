class Point {
  constructor(i, x, y) {
    this.index = i;
    this.isStartingNode = false
    this.isEndingNode = false
    this.position = new p5.Vector(x, y)
    this.diameter = DEFAULT_DIAMETER;
    this.xdirection=random(3);
    this.ydirection=random(3);
    this.neighbors = [];
    this.parent = null
    this.visited = false
    this.color = color(255, 255, 255)
    this.speed = 0.2;
    this.continueMoving = true
    
  }

  get_coordinates(){
    return [this.position.x, this.position.y]
  }  
  
  display(){
    let [x, y] = this.get_coordinates();
    let index = this.index
    fill(this.color);
    circle(x, y, this.diameter);
    noFill();
    
    if(this.isStartingNode){
      stroke(0, 255, 0)
      circle(x, y, this.diameter * 5); 
    }else if(this.isEndingNode){
      stroke(0, 0, 255)
      circle(x, y, this.diameter * 5)
    }else{
      stroke(255)
      circle(x, y, this.diameter * 5);
    }
  
    for(let i = 0; i < this.neighbors.length; i++){
      add_edge(this, graph.nodes[this.neighbors[i].index])
    }
  }

  move(){ //NEED TO CHANGE THIS ENTIRE THING WHEN IMPLEMENTING ANT BEHAVIOR
    this.position.x += this.speed * this.xdirection;
    this.position.y += this.speed * this.ydirection;
    
    if(this.position.x > width || this.position.x < 0 ) this.xdirection = -this.xdirection;
    if(this.position.y > height || this.position.y < 0 ) this.ydirection = -this.ydirection;

    //IF CELL COLLIDES WITH MAZE WALL
    for(let i = 0; i < walls.length; i++){
      let [x, y, x2, y2] = walls[i]
      if(collideRectCircle(x, y, x2 - x, y2 - y, ...this.get_coordinates(), this.diameter)){
        this.xdirection = -this.xdirection
        this.ydirection = -this.ydirection
      }
    }

    //IF CELL COLLIDES WITH OTHER CELL
    for(let j = 0; j < graph.nodes.length; j++){
      if(this.index === j) continue
      if(collideCircleCircle(...this.get_coordinates(), this.diameter, ...graph.nodes[j].get_coordinates(), graph.nodes[j].diameter)){
        this.xdirection = -this.xdirection
        this.ydirection = -this.ydirection
      }
    }
  }

  findNeighbors(){ //NEED TO CHANGE THIS IF MOVING TO EUCLIDEAN DISTANCE BASED HEURISTIC
    this.neighbors = []
    for(let j = 0; j < graph.nodes.length; j++){
      if(j === this.index) continue
      //if(distance(this, graph.nodes[j]) < MAX_DIST && (P2PLineCollision(this, graph.nodes[j]) === false)){
      if(distance(this, graph.nodes[j]) < MAX_DIST){
          this.neighbors.push(graph.nodes[j])
        graph.nodes[j].neighbors.push(this)
      }
    }
    

  
  }
  
//   findNeighbors(k){  
    
//      for(let j = 0; j < COUNT; j++){
//        if(j === this.index) continue;
//        this.neighbors.push([j, distance(this, graph.nodes[j])]);
//      }
     
//      this.neighbors.sort((a, b) => {
//        return a[1] - b[1]
//      })
     
//      let k_neighbors = this.neighbors.splice(0, k);
//      this.neighbors = this.neighbors.slice(0, k)
      
//      for(k of k_neighbors){
//         add_edge(this, graph.nodes[k[0]]);
//      }
    
//    }
}