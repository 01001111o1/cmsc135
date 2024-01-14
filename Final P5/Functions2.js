function keyPressed() {
    if (keyCode === SHIFT) {
        for (let i = 0; i < 20; i++) {
        const x = mouseX + randomGaussian() * 10;
        const y = mouseY + randomGaussian() * 10;
        food.push(createVector(x, y));
        }
    }
}

function collision(x1, y1, x2, y2, x3, y3, x4, y4){
  
    let intersection = {
        x : false,
        y : false
    }

    let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        
        let intersectionX = x1 + (uA * (x2-x1));
        let intersectionY = y1 + (uA * (y2-y1));
        
    intersection = {
        x : intersectionX,
        y : intersectionY
        }
        
        return intersection
    }
    return intersection
}

function findIntersection(a, b, c, d, obstacles) {
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        const intersection = collision(a, b, c, d, ...obstacle.coords);
        
        if (intersection.x !== false && intersection.y !== false) {
            return intersection;
        }
    }
    return {x : false, y: false};
}

function drawAnts(){
    for (let i = pheromones.length - 1; i >= 0; i--) {
        const p = pheromones[i];
        for (let n = 0; n < 3; n++) p.update();
        p.render();
        if (p.strength < 0) pheromones.splice(i, 1);
      }
    
      for (let n = 0; n < 3; n++) {
        for (let i = 2; i < vehicles.length; i++) {
          const v = vehicles[i];
          v.applyBehaviors();
          v.update();
          if (v.pos.dist(home) < homeR) v.reset();
        }
        frames++;
      }
      
      for (const v of vehicles) v.render();
      for(let i = 0; i < obstacles.length; i++) obstacles[i].renderObstacle();
    
    push();
    noStroke();
    fill(255, 0, 0);
    circle(width - 100, height - 100, homeR * 2);
    pop();
    
    push();
    stroke(0, 255, 0);
    fill(0, 255, 0);
    circle(home.x, home.y, homeR * 2);
    pop();
}
