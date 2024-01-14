function Graph(){
  this.nodes = []
  this.graph = {}
  this.start = null
  this.end = null 
  this.pathFound = false
}

Graph.prototype.addNode = function(n){
  this.nodes.push(n)
  let index = n.index
  this.graph[index] = n
}

Graph.prototype.setStart = function(n){
  this.start = this.graph[n]
  this.graph[n].isStartingNode = true
  return this.start
}

Graph.prototype.setEnd = function(n){
  this.end = this.graph[n]
  this.graph[n].isEndingNode = true
  return this.end
}

Graph.prototype.reset = function(){
  for(let i = 0; i < this.nodes.length; i++){
    this.nodes[i].visited = false;
    this.nodes[i].parent = null
    this.nodes[i].diameter = DEFAULT_DIAMETER
    this.nodes[i].color = color(255, 255, 255)
  }
}