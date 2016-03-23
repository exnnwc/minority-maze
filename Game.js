function Game(){
	this.beginGeneratingWorld = beginGeneratingWorld;
	this.movePlayer=movePlayer;
    this.moveHostiles=moveHostiles;	
	this.gameOver=gameOver;
	this.generateWorld=generateWorld;
	this.queenTouched=queenTouched;
	
	validQueenSpawn=false;
	this.generateWorld();
	
	this.world.display();
}
function beginGeneratingWorld(){
	this.world = new World(50, 25);
	this.maxNumOfOthers = this.world.sizeOfX * this.world.sizeOfY * (50/100);		
	this.others = new Others()        
    this.hostiles = new Hostiles();	
	this.isActive=true;
	
	this.player = new Player(this.world.randomSpawnPoint());	
	this.world.map[this.player.pos["x"]][this.player.pos["y"]]=1;
	
    numOfOthers = 0;
    while (numOfOthers<this.maxNumOfOthers){
		numOfOthers++;
        spawn = this.world.randomSpawnPoint();
		this.world.map[spawn["x"]][spawn["y"]]=2;		
		this.others.add(spawn);
    }
}
function gameOver(){
	alert("Game over!");
	this.isActive=false;
}

function generateWorld(){
	while (!validQueenSpawn) {			
		this.beginGeneratingWorld();	
		queenSpawn=this.world.farSpawn(this.player.pos);

		if (queenSpawn!==false){		
			if (this.world.okayForTheQueen(queenSpawn)){
				validQueenSpawn=true;
				this.queen = new Queen (queenSpawn);
				this.world.map[this.queen.pos["x"]][this.queen.pos["y"]]=4;
			}
		} else if (queenSpawn===false){
			delete this.world;
			delete this.maxNumOfOthers;
			delete this.others;
			delete this.hostiles;
			delete this.isActive;
			delete this.player;
		}

	}
}
function movePlayer(direction, holdingShift){

    if (direction === "Left" && this.player.pos["x"]>1){
		if (this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]==0){			
			this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"]-1, y:this.player.pos["y"]});
			this.moveHostiles();
		} else if (holdingShift && this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]==2
          && this.player.pos["x"]>2 && this.world.map[this.player.pos["x"]-2][this.player.pos["y"]]==0){
            this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]=3;
            this.hostiles.add({x:this.player.pos["x"]-1, y:this.player.pos["y"]});
			this.world.map[this.player.pos["x"]-2][this.player.pos["y"]]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"]-2, y:this.player.pos["y"]});
        } else if (this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]==3){
			this.gameOver();
		} else if (this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]==4){
			this.queenTouched();
		}
	} else  if (direction === "Right" && this.player.pos["x"]<this.world.sizeOfX){
		if (this.world.map[this.player.pos["x"]+1][this.player.pos["y"]]==0){			
			this.world.map[this.player.pos["x"]+1][this.player.pos["y"]]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"]+1, y:this.player.pos["y"]});
			this.moveHostiles();
		} else if (holdingShift && this.world.map[this.player.pos["x"]+1][this.player.pos["y"]]==2
          && this.player.pos["x"]<this.world.sizeOfX-2 && this.world.map[this.player.pos["x"]+2][this.player.pos["y"]]==0){
            this.world.map[this.player.pos["x"]+1][this.player.pos["y"]]=3;
            this.hostiles.add({x:this.player.pos["x"]+1, y:this.player.pos["y"]});
			this.world.map[this.player.pos["x"]+2][this.player.pos["y"]]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"]+2, y:this.player.pos["y"]});
        } else if (this.world.map[this.player.pos["x"]+1][this.player.pos["y"]]==3){
			this.gameOver();
		} else if (this.world.map[this.player.pos["x"]+1][this.player.pos["y"]]==4){
			this.queenTouched();
		}
	} else if (direction === "Up" && this.player.pos["y"]>1){
		if (this.world.map[this.player.pos["x"]][this.player.pos["y"]-1]==0){			
			this.world.map[this.player.pos["x"]][this.player.pos["y"]-1]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"], y:this.player.pos["y"]-1});
			this.moveHostiles();
		} else if (holdingShift && this.world.map[this.player.pos["x"]][this.player.pos["y"]-1]==2
          && this.player.pos["y"]>2 && this.world.map[this.player.pos["x"]][this.player.pos["y"]-2]==0){
            this.world.map[this.player.pos["x"]][this.player.pos["y"]-1]=3;
            this.hostiles.add({x:this.player.pos["x"], y:this.player.pos["y"]-1});
			this.world.map[this.player.pos["x"]][this.player.pos["y"]-2]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"], y:this.player.pos["y"]-2});
			
        } else if (this.world.map[this.player.pos["x"]][this.player.pos["y"]-1]==3){
			this.gameOver();
		} else if (this.world.map[this.player.pos["x"]][this.player.pos["y"]-1]==4){
			this.queenTouched();
		}
	} else if (direction === "Down" && this.player.pos["y"]<this.world.sizeOfY){
		if (this.world.map[this.player.pos["x"]][this.player.pos["y"]+1]==0){			
			this.world.map[this.player.pos["x"]][this.player.pos["y"]+1]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"], y:this.player.pos["y"]+1});
			this.moveHostiles();

		} else if (holdingShift && this.world.map[this.player.pos["x"]][this.player.pos["y"]+1]==2
          && this.player.pos["y"]<this.world.sizeOfY-2 && this.world.map[this.player.pos["x"]][this.player.pos["y"]+2]==0){
            this.world.map[this.player.pos["x"]][this.player.pos["y"]+1]=3;
            this.hostiles.add({x:this.player.pos["x"], y:this.player.pos["y"]+1});
			this.world.map[this.player.pos["x"]][this.player.pos["y"]+2]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"], y:this.player.pos["y"]+2});
        } else if (this.world.map[this.player.pos["x"]][this.player.pos["y"]+1]==3){
			this.gameOver();
		} else if (this.world.map[this.player.pos["x"]][this.player.pos["y"]+1]==4){
			this.queenTouched();
		}
	}
	this.world.display();
}

function moveHostiles(){
    for(hostile=0;hostile<this.hostiles.locations.length;hostile++){
		randomNeighbor=this.world.randomNonOther(this.hostiles.locations[hostile]);
		if (this.world.map[randomNeighbor["x"]][randomNeighbor["y"]]==0){
			this.world.map[this.hostiles.locations[hostile]["x"]][this.hostiles.locations[hostile]["y"]]=0;
			this.hostiles.move(hostile, randomNeighbor);
			this.world.map[this.hostiles.locations[hostile]["x"]][this.hostiles.locations[hostile]["y"]]=3;
		} else if (this.world.map[randomNeighbor["x"]][randomNeighbor["y"]]==1){

		} else if (this.world.map[randomNeighbor["x"]][randomNeighbor["y"]]==3 && randomNum(1,8)==1){
				
			randomOther=this.world.randomOther(this.hostiles.locations[hostile]);
			if (randomOther!==false){
				this.world.map[randomOther["x"]][randomOther["y"]]=3;
				this.hostiles.add(randomOther);
			}
		}
		
		
    }    
}

function queenTouched(){
	while (true){
		queenSpawn=this.world.farSpawn(this.player.pos);
		if(this.world.okayForTheQueen(queenSpawn)){
			this.world.map[this.queen.pos["x"]][this.queen.pos["y"]]=0;
			this.world.map[queenSpawn["x"]][queenSpawn["y"]]=4;
			this.queen.move(queenSpawn);
			return;
		}
	}
	
}

