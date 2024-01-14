let COUNT = 2, MAX_DIST = 200, w = 80, count = 0
let path = [], walls = [], grid = [], stack = []
let graph, rows, cols, current
let DEFAULT_DIAMETER = 12, PATH_DIAMETER = 16

function setup() {
  createCanvas(800, 800);
  rectMode(CORNERS);

  graph = new Graph();

  init_maze()
	generate_maze()	

  for (let i = 0; i < COUNT; i++) {
    let p = new Point(i, random(50, width - 50), random(50, height - 50));
    graph.addNode(p);
  }


}

function draw() {
  background(0);

  display_maze();
    
  //if(graph.pathFound === false) simulateBFS(0, 1)

  strokeWeight(1);

  for (let i = 0; i < graph.nodes.length; i++) {
    graph.nodes[i].display();
    //graph.nodes[i].findNeighbors(K);
    //graph.nodes[i].continueMoving = false
    if(graph.nodes[i].continueMoving) graph.nodes[i].move();
  }


}
