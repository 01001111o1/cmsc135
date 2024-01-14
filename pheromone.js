class Pheromone extends p5.Vector{
    constructor(x, y, kind) {
      super(x, y);
      this.strength = 200;
      this.kind = kind;
    }
    
    update() {
      this.strength = this.strength - 0.5;
    }
    
    render() {
      push()
      const alpha = map(this.strength, 0, 200, 0, 255);
      noStroke();
      if (this.kind) fill(255, 0, 0, alpha);
      else           fill(0, 128, 255, alpha);
      circle(this.x, this.y, 3);
      pop()
    }
  }