class Pheromone extends p5.Vector{
    constructor(x, y) {
      super(x, y);
      this.strength = 200;
    }
    
    update() {
      this.strength = this.strength - 0.2;
    }
    
    render() {
      push()
      const alpha = map(this.strength, 0, 200, 0, 255);
      noStroke();
      fill(0, 128, 255, alpha);
      circle(this.x, this.y, 3);
      pop()
    }
  }