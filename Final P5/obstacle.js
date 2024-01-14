class Obstacle{
    
    constructor(a, b,c, d) {
        this.coords = [a, b, c, d]
    }
    
    renderObstacle() {
        push();
        stroke(0)
        line(...this.coords)
        pop();
    }
  
}