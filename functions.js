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
        "x" : false,
        "y" : false
    }

    let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        
        let intersectionX = x1 + (uA * (x2-x1));
        let intersectionY = y1 + (uA * (y2-y1));
        
    intersection = {
        "x" : intersectionX,
        "y" : intersectionY
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
    return {"x" : false, "y": false};
}