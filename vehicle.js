class Vehicle {
    constructor(id, x, y, angle) {
      this.id = id;
      this.startX = x;
      this.startY = y;
      this.angle = angle;
      this.reset();
    }
    
    wander() {
      this.wanderAngle += random(-this.change, this.change);
      const circlePos = this.vel.copy();
      circlePos.setMag(this.wanderD);
      circlePos.add(this.pos);
      const h = this.vel.heading();
      const circleOffset = p5.Vector.fromAngle(this.wanderAngle + h);
      circleOffset.mult(this.wanderR);
      const target = p5.Vector.add(circlePos, circleOffset);
      return this.seek(target);
    }

    avoid(){
      let p1 = this.vel.copy(), p2 = this.vel.copy();
      let a = this.vel.copy(), b = this.vel.copy();

      p1.rotate(0.174533).setMag(maxRange).add(this.pos);
      a.rotate(2.26893).setMag(maxRange / 4).add(this.pos);

      p2.rotate(6.109).setMag(maxRange).add(this.pos);
      b.rotate(3.83972).setMag(maxRange / 4).add(this.pos);

      stroke(0)
      let l1 = line(a.x, a.y, p1.x, p1.y)
      let l2 = line(b.x, b.y, p2.x, p2.y)
      
      let avoidDirection = createVector(0, 0);

      let hit_left = findIntersection(a.x, a.y, p1.x, p1.y, obstacles)
      const left = createVector(hit_left.x, hit_left.y)

      if(hit_left.x !== false){
        avoidDirection = p2.sub(left).mult(this.pos.dist(left))
        return this.seek(avoidDirection)
      }

      let hit_right = findIntersection(b.x, b.y, p2.x, p2.y, obstacles)
      const right = createVector(hit_right.x, hit_right.y)

      if(hit_right.x !== false){
        avoidDirection = p1.sub(right).mult(this.pos.dist(right))
        return this.seek(avoidDirection)
      }
      return avoidDirection
    }

    followPheromones() {

      const left_pos = this.vel.copy(), middle_pos = this.vel.copy(), right_pos = this.vel.copy();
      left_pos.rotate(-PI/3).setMag(this.wanderD).add(this.pos);
      middle_pos.rotate(0).setMag(this.wanderD).add(this.pos);
      right_pos.rotate(PI/3).setMag(this.wanderD).add(this.pos);

      let left = 0, middle = 0, right = 0;

      for (const p of pheromones) {
        const weighedStrength = p.kind !== this.food ? p.strength : 0;
        if (left_pos.dist(p) < this.wanderR) left += weighedStrength;
        else if (middle_pos.dist(p) < this.wanderR) middle += weighedStrength;
        else if (right_pos.dist(p) < this.wanderR) right += weighedStrength;
      }

      let largest = 1;
      if (left > middle && left > right) largest = 0;
      else if (right > middle && right > left) largest = 2;
      
      if (largest === 0) return this.seek(left_pos);
      if (largest === 1) return this.seek(middle_pos);

      return this.seek(right_pos);
    }
    
    seek(target) {
      const desired = p5.Vector.sub(target, this.pos);
      desired.setMag(this.maxspeed);
      const steering = p5.Vector.sub(desired, this.vel);
      steering.limit(this.maxforce);
      return steering;
    }
    
    applyForce(force) {
      this.acc.add(force);
    }
    
    applyBehaviors() {
      const w = this.wander();
      const e = createVector();
      const avoidForce = this.avoid();
      
      w.add(this.followPheromones().mult(3));
      w.mult(0.25);
      let closest = null;
      let minDist = Infinity;
      for (const f of food) {
        const d = this.pos.dist(f);
        if (d < minDist) {
          minDist = d;
          closest = f;
        }
      }
      if (minDist < this.r && !this.food) {
        food.splice(food.indexOf(closest), 1);
        this.food = true;
        this.vel.mult(-1);
      } else if (minDist < this.perception && !this.food) {
        e.set(this.seek(closest));
      } else if (this.food && this.pos.dist(home) < this.perception) {
        e.set(this.seek(home));
      }

      if (e.x !== 0 || e.y !== 0) w.mult(0);
    
      this.applyForce(w);
      this.applyForce(e);
      this.applyForce(avoidForce.mult(2));

    }
    
    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxspeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
      if (frames % 5 === 0) pheromones.push(new Pheromone(this.pos.x, this.pos.y, this.food));
    }

    wrapAround() {
      if (this.pos.x < 25) this.pos.x = width-25;
      else if (this.pos.x > width-25) this.pos.x = 25;
      
      if (this.pos.y < 25) this.pos.y = height-25;
      else if (this.pos.y > height-25) this.pos.y = 25;
    }
    
    reset() {
      this.pos = createVector(this.startX, this.startY);
      this.vel = p5.Vector.fromAngle(this.angle).mult(1);
      this.acc = createVector();
      this.r = 3;
      this.maxspeed = 1; //2;
      this.maxforce = 0.05; //0.1;
      this.wanderR = 12.5; //25;
      this.wanderD = 40; //80;
      this.change = 0.3;
      this.wanderAngle = 0;
      this.perception = 50;
      this.food = false;
      this.rays = new Array(2);
    }
    
    render() {
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.vel.heading());
      stroke(0);
      fill(128);
      if (this.food) fill(0, 255, 0);
      triangle(this.r*2, 0, -this.r*2, -this.r, -this.r*2, this.r);
      pop();
    }

  }