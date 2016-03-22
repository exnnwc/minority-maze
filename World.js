function World (sizeOfX, sizeOfY){
	this.sizeOfX = sizeOfX;
	this.sizeOfY = sizeOfY;

	this.display = displayWorld;
	this.randomSpawnPoint = randomSpawnPoint;
	this.neighbors = listNeighbors;
	this.randomNonOther = fetchRandomNonOther;
	this.randomOther = fetchRandomOther;
	var map = new Array(new Array());
	for(x=0;x<this.sizeOfX;x++){
		map.push([]);
		for(y=0;y<this.sizeOfY;y++){			
			map[x].push(0);
		}
	}
	this.map = map;	
}

function displayWorld (){			
	worldString = "";
	for(y=1;y<this.sizeOfY;y++){		
		worldString = worldString + "<div>";
		for (x=1;x<this.sizeOfX;x++){
			worldString = worldString + "<span title='("+x+", "+y+")' class='cell ";
			
			if (this.map[x][y]==2){
				worldString = worldString + " other";
			} else if (this.map[x][y]==3){
				worldString = worldString + " hostile";
			}
			worldString = worldString + "'>";
			if (this.map[x][y]==1){
				worldString = worldString + "O";
			} else if (this.map[x][y]==2){

				worldString = worldString + "@";
			} else if (this.map[x][y]==3){
				worldString = worldString + "X";
			}
			worldString = worldString + "</span>";
		}
		worldString = worldString + "</div>";
	}
	$("#world_div").html(worldString);			
}



function randomSpawnPoint(){
    while (true){
        rand_x = randomNum(1, this.sizeOfX-1);
        rand_y = randomNum(1, this.sizeOfY-1); 
        if (this.map[rand_x][rand_y]==0){
            return {x:rand_x, y:rand_y};
        }
    }
    
}

function listNeighbors(location){		
	neighbors=new Array();
	for(x=location["x"]-1;x<=location["x"]+1;x++){
		for(y=location["y"]-1;y<=location["y"]+1;y++){
			if (typeof this.map[x][y]!=="undefined" && !(x==location["x"] && y==location["y"])){
				neighbors.push({x:x, y:y});
			}
		}
	}
	return neighbors;
}

function fetchRandomNonOther(location){
	neighbors=this.neighbors(location);
	
	tries=0;
	while(tries<neighbors.length*neighbors.length){
		randomNumber=randomNum(0, neighbors.length-1);
		if (this.map[neighbors[randomNumber]["x"]][neighbors[randomNumber]["y"]]!=2){
			tries=1000;
		}
		tries++;
	}
	return neighbors[randomNumber];
}

function fetchRandomOther(location){	
	neighbors=this.neighbors(location);	
	otherFound=false;
	for(neighbor=0;neighbor<neighbors.length;neighbor++){
		if (this.map[neighbors[neighbor]["x"]][neighbors[neighbor]["y"]]==2){
			otherFound=true;
		}
	}
	if (!otherFound){
		return false;
	}
	tries=0;
	while(tries<neighbors.length*neighbors.length){
		randomNumber=randomNum(0, neighbors.length-1);
		if (this.map[neighbors[randomNumber]["x"]][neighbors[randomNumber]["y"]]==2){
			tries=1000;
		}
		tries++;
	}
	return neighbors[randomNumber];
}

