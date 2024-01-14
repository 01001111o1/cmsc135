class Cell{

    constructor(x, y){
        this.x = x;
        this.y = y;
        this.walls = [true, true, true, true]; 
        this.visited = false;
    }
    
    getNext = function(){
        let nei = [];
        let [x, y] = this.index()
        let top, right, bottom, left

        if(y > 0) top = grid[x][y - 1]
        if(x < cols - 1) right = grid[x + 1][y]
        if(y < rows - 1) bottom = grid[x][y + 1]
        if(x > 0) left = grid[x - 1][y]

        let dirs = [top, left, bottom, right]

        for(let dir of dirs) 
            if(dir && !dir.visited) nei.push(dir)

        return nei[floor(random(0, nei.length))] ?? undefined
    }
    
    show = function(){

        let x = this.x * w;
        let y = this.y * w;
        
        stroke(255);
        
        if(this.walls[0]) line(x, y, x + w, y);
        if(this.walls[1]) line(x + w, y, x + w, y + w);
        if(this.walls[2]) line(x + w, y + w, x, y + w);
        if(this.walls[3]) line(x, y + w, x, y);
    
    }

    removeWalls = function(next){
        if(this.x > next.x){
            this.walls[3] = false;
            next.walls[1] = false;
        }else if(this.x < next.x){
            this.walls[1] = false;
            next.walls[3] = false;
        }

        if(this.y > next.y){
            this.walls[0] = false;
            next.walls[2] = false;
        }else if(this.y < next.y){
            this.walls[2] = false;
            next.walls[0] = false;
        }
    }

    index = function(){
        return [this.x, this.y]
    }
    

}