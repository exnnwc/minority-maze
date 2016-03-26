function World (sizeOfX, sizeOfY){
	this.sizeOfX = sizeOfX;
	this.sizeOfY = sizeOfY;
	this.directions = ["n", "e", "s", "w"];
	
	this.display = displayWorld;
	this.findHostiles = whichWayToHostiles;
	this.okayForTheQueen = isItOkayForTheQueen;
	this.randomSpawnPoint = randomSpawnPoint;
	this.farSpawn = fetchFarSpawn;
	this.look = look;
	this.neighbors = listNeighbors;
	this.neighborsStatus = neighborsStatus;
	this.randomNonOther = fetchRandomNonOther;
	this.randomOther = fetchRandomOther;
	this.randomOpen = fetchRandomOpen;
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
			if (x===1){
				worldString = worldString + " world-left";
			} else if (x===this.sizeOfX-1){
				worldString = worldString + " world-right";
			}
			
			if (y===1){
				worldString = worldString + " world-up";
			} else if (y===this.sizeOfY-1){
				worldString = worldString + " world-down";
			}
			if (this.map[x][y]==0){
				worldString = worldString + " empty";
			} else if (this.map[x][y]==1){
				worldString = worldString + " player";
			} else if (this.map[x][y]==2){
				worldString = worldString + " other";
			} else if (this.map[x][y]==3){
				worldString = worldString + " hostile";
			} else if (this.map[x][y]==4){
				worldString = worldString + " queen";
			} else if (this.map[x][y]==5){
				worldString = worldString + " baby";
			}
			worldString = worldString + "'>";
			if (this.map[x][y]==1 ){
				worldString = worldString + "O";
			} else if (this.map[x][y]==2){

				worldString = worldString + "";
			} else if (this.map[x][y]==3){
				worldString = worldString + "&nabla;";
			} else if (this.map[x][y]==4){
				worldString = worldString + "";
			} else if (this.map[x][y]==5){
				worldString = worldString + "&Delta;";
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

function isItOkayForTheQueen(location){
	openSpots=0;
	if (this.map[location["x"]+1][location["y"]]==0){
		openSpots++;
	}
	if (this.map[location["x"]-1][location["y"]]==0){
		openSpots++;
	}
	if (this.map[location["x"]][location["y"]+1]==0){
		openSpots++;
	}
	if (this.map[location["x"]][location["y"]-1]==0){
		openSpots++;
	}
	if (openSpots>2){
		return true;
	}
	return false;
}
function listNeighbors(location){
	neighbors=new Array();
	for(x=location["x"]-1;x<=location["x"]+1;x++){
		for(y=location["y"]-1;y<=location["y"]+1;y++){
			if (x>0 && x<this.sizeOfX && y>0 && this.sizeOfY 
			&& typeof this.map[x][y]!=="undefined" 
			&& !(x==location["x"] 
			&& y==location["y"])){
				neighbors.push({x:x, y:y});
			}
		}
	}
	return neighbors;
}

function neighborsStatus(location){

	neighbors=this.neighbors(location);
	neighborStatus=[];
	for (i=0;i<10;i++){
		neighborStatus.push(0);
	}
	for (neighbor=0;neighbor<neighbors.length;neighbor++){
		neighborStatus[this.map[neighbors[neighbor]["x"]][neighbors[neighbor]["y"]]]++;
	}
	return neighborStatus;
}
function fetchFarSpawn(location){

	min_dist_from_player = Math.floor(Math.sqrt(this.sizeOfX * this.sizeOfY));
	tries=0;
	while (tries<this.sizeOfX*this.sizeOfY){
		spawn=this.randomSpawnPoint();
		distance=Math.sqrt(Math.pow((spawn["x"]-location["x"]),2)+Math.pow((spawn["y"]-location["y"]), 2));
		if (distance > min_dist_from_player){
			return spawn;
		}
		tries++;		
	}
	return false;
	
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
function fetchRandomOpen(location){	
	neighbors=this.neighbors(location);	
	openFound=false;
	for(neighbor=0;neighbor<neighbors.length;neighbor++){
		if (this.map[neighbors[neighbor]["x"]][neighbors[neighbor]["y"]]==0){
			openFound=true;
		}
	}
	if (!openFound){
		return false;
	}
	tries=0;
	while(tries<neighbors.length*neighbors.length){
		randomNumber=randomNum(0, neighbors.length-1);
		if (this.map[neighbors[randomNumber]["x"]][neighbors[randomNumber]["y"]]==0){
			tries=1000;
		}
		tries++;
	}
	return neighbors[randomNumber];
}

function look(location, direction){
	if (direction==="n"){
		for(y=location["y"]-1;y>=1;y--){
			if (this.map[location["x"]][y]!=0){
				return this.map[location["x"]][y];
			}
		}
		return false;
	} else if (direction==="e"){
		for(x=location["x"]+1;x<this.sizeOfX;x++){
			if (this.map[x][location["y"]]!=0){
				return this.map[x][location["y"]];
			}
		}
		return false;
	} else if (direction==="s"){
		for(y=location["y"]+1;y<this.sizeOfY;y++){
			if (this.map[location["x"]][y]!=0){
				return this.map[location["x"]][y];
			}
		}
		return false;
	} else if (direction==="w"){
		for(x=location["x"]-1;x>1;x--){
			if (this.map[x][location["y"]]!=0){
				return this.map[x][location["y"]];
			}
		}
		return false;
	}
}

function whichWayToHostiles(location){
	for (i in this.directions){
		direction = this.directions[i];
		if (this.look(location, direction)===3){
			return direction;
		}
	}

	return false;
}