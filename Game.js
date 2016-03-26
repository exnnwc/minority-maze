function Game(){
	this.beginGeneratingWorld = beginGeneratingWorld;
	this.moveBabies=moveBabies;
	this.movePlayer=movePlayer;	
    this.moveHostiles=moveHostiles;	
	this.gameOver=gameOver;
	this.generateWorld=generateWorld;
	this.queenTouched=queenTouched;
	this.updateStatus=updateStatus;

	validQueenSpawn=false;
	this.generateWorld();
	this.updateStatus();
	this.world.display();
}
function beginGeneratingWorld(){
	this.num_of_moves=0;
	time = new Date();
	this.begin_time=time.getTime();
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
	$("#game_over_div").show();
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
				this.babies = new Babies();
				
				for(i=0;i<20;i++){
					//randomSpawn = this.world.randomSpawnPoint();
					//this.babies.add(randomSpawn);
					//this.world.map[randomSpawn["x"]][randomSpawn["y"]]=5;
				}
			}
		} else if (queenSpawn===false){
			delete this.world;
			delete this.maxNumOfOthers;
			delete this.others;
			delete this.hostiles;
			delete this.isActive;
			delete this.player;
			delete this.babies;
		}

	}
}

function movePlayer(direction, holdingShift){
	this.num_of_moves++;
	this.updateStatus();
	
    if (direction === "Left" && this.player.pos["x"]>1){
		if (this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]==0){			
			this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"]-1, y:this.player.pos["y"]});
			this.moveHostiles();
			this.moveBabies();
		} else if (holdingShift && this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]==2
          && this.player.pos["x"]>2 && this.world.map[this.player.pos["x"]-2][this.player.pos["y"]]==0){
            this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]=3;
            this.hostiles.add({x:this.player.pos["x"]-1, y:this.player.pos["y"]});
			this.world.map[this.player.pos["x"]-2][this.player.pos["y"]]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"]-2, y:this.player.pos["y"]});
			this.moveBabies();
        } else if (this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]==3){
			this.gameOver();
		} else if (this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]==4){
			this.queenTouched();
		} else if (this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]==5){
			this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=5;			
			this.babies.move(this.babies.whosAt(this.player.pos["x"]-1, this.player.pos["y"]), this.player.pos);
			this.player.move({x:this.player.pos["x"]-1, y:this.player.pos["y"]});
			this.moveHostiles();
		}
	} else  if (direction === "Right" && this.player.pos["x"]<this.world.sizeOfX){
		if (this.world.map[this.player.pos["x"]+1][this.player.pos["y"]]==0){			
			this.world.map[this.player.pos["x"]+1][this.player.pos["y"]]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"]+1, y:this.player.pos["y"]});
			this.moveHostiles();
			this.moveBabies();
		} else if (holdingShift && this.world.map[this.player.pos["x"]+1][this.player.pos["y"]]==2
          && this.player.pos["x"]<this.world.sizeOfX-2 && this.world.map[this.player.pos["x"]+2][this.player.pos["y"]]==0){
            this.world.map[this.player.pos["x"]+1][this.player.pos["y"]]=3;
            this.hostiles.add({x:this.player.pos["x"]+1, y:this.player.pos["y"]});
			this.world.map[this.player.pos["x"]+2][this.player.pos["y"]]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"]+2, y:this.player.pos["y"]});
			this.moveBabies();
        } else if (this.world.map[this.player.pos["x"]+1][this.player.pos["y"]]==3){
			this.gameOver();
		} else if (this.world.map[this.player.pos["x"]+1][this.player.pos["y"]]==4){
			this.queenTouched();
		} else if (this.world.map[this.player.pos["x"]+1][this.player.pos["y"]]==5){	
			this.world.map[this.player.pos["x"]+1][this.player.pos["y"]]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=5;		
			this.babies.move(this.babies.whosAt(this.player.pos["x"]+1, this.player.pos["y"]), this.player.pos);			
			this.player.move({x:this.player.pos["x"]+1, y:this.player.pos["y"]});
			this.moveHostiles();
		}
	} else if (direction === "Up" && this.player.pos["y"]>1){
		if (this.world.map[this.player.pos["x"]][this.player.pos["y"]-1]==0){			
			this.world.map[this.player.pos["x"]][this.player.pos["y"]-1]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"], y:this.player.pos["y"]-1});
			this.moveHostiles();
			this.moveBabies();
		} else if (holdingShift && this.world.map[this.player.pos["x"]][this.player.pos["y"]-1]==2
          && this.player.pos["y"]>2 && this.world.map[this.player.pos["x"]][this.player.pos["y"]-2]==0){
            this.world.map[this.player.pos["x"]][this.player.pos["y"]-1]=3;
            this.hostiles.add({x:this.player.pos["x"], y:this.player.pos["y"]-1});
			this.world.map[this.player.pos["x"]][this.player.pos["y"]-2]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"], y:this.player.pos["y"]-2});
			this.moveBabies();
			
        } else if (this.world.map[this.player.pos["x"]][this.player.pos["y"]-1]==3){
			this.gameOver();
		} else if (this.world.map[this.player.pos["x"]][this.player.pos["y"]-1]==4){
			this.queenTouched();
		} else if (this.world.map[this.player.pos["x"]][this.player.pos["y"]-1]==5){			
			this.world.map[this.player.pos["x"]][this.player.pos["y"]-1]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=5;
			this.babies.move(this.babies.whosAt(this.player.pos["x"], this.player.pos["y"]-1), this.player.pos);			
			this.player.move({x:this.player.pos["x"], y:this.player.pos["y"]-1});
			this.moveHostiles();
		}
	} else if (direction === "Down" && this.player.pos["y"]<this.world.sizeOfY){
		if (this.world.map[this.player.pos["x"]][this.player.pos["y"]+1]==0){			
			this.world.map[this.player.pos["x"]][this.player.pos["y"]+1]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"], y:this.player.pos["y"]+1});
			this.moveHostiles();
			this.moveBabies();
		} else if (holdingShift && this.world.map[this.player.pos["x"]][this.player.pos["y"]+1]==2
          && this.player.pos["y"]<this.world.sizeOfY-2 && this.world.map[this.player.pos["x"]][this.player.pos["y"]+2]==0){
            this.world.map[this.player.pos["x"]][this.player.pos["y"]+1]=3;
            this.hostiles.add({x:this.player.pos["x"], y:this.player.pos["y"]+1});
			this.world.map[this.player.pos["x"]][this.player.pos["y"]+2]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"], y:this.player.pos["y"]+2});
			this.moveBabies();
        } else if (this.world.map[this.player.pos["x"]][this.player.pos["y"]+1]==3){
			this.gameOver();
		} else if (this.world.map[this.player.pos["x"]][this.player.pos["y"]+1]==4){
			this.queenTouched();
		} else if (this.world.map[this.player.pos["x"]][this.player.pos["y"]+1]==5){			
			this.world.map[this.player.pos["x"]][this.player.pos["y"]+1]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=5;
			this.babies.move(this.babies.whosAt(this.player.pos["x"], this.player.pos["y"]+1), this.player.pos);			
			this.player.move({x:this.player.pos["x"], y:this.player.pos["y"]+1});
			this.moveHostiles();
		}
	}
	this.world.display();
}

function moveBabies(){
    for(baby=0;baby<this.babies.locations.length;baby++){
		whichWayToGo=this.world.findHostiles(this.babies.locations[baby]);
		if (whichWayToGo!==false){
			if (whichWayToGo==="e"){
				newX=this.babies.locations[baby]["x"]+1;
				newY=this.babies.locations[baby]["y"];
			} else if (whichWayToGo=="n"){
				newX=this.babies.locations[baby]["x"];
				newY=this.babies.locations[baby]["y"]-1;
			} else if (whichWayToGo=="s"){
				newX=this.babies.locations[baby]["x"];
				newY=this.babies.locations[baby]["y"]+1;
			} else if (whichWayToGo==="w"){
				newX=this.babies.locations[baby]["x"]-1;
				newY=this.babies.locations[baby]["y"];
			}

			
			if (this.world.map[newX][newY]===3){		
				this.hostiles.kill(newX, newY);				
			}
			this.world.map[newX][newY]=5;			
			this.world.map[this.babies.locations[baby]["x"]][this.babies.locations[baby]["y"]]=0;
			this.babies.move(baby, {x:newX, y:newY});
		} else if (whichWayToGo===false){
			randomNeighbor=this.world.randomNonOther(this.babies.locations[baby]);
			if (this.world.map[randomNeighbor["x"]][randomNeighbor["y"]]==0){
				this.world.map[this.babies.locations[baby]["x"]][this.babies.locations[baby]["y"]]=0;
				this.babies.move(baby, randomNeighbor);
				this.world.map[this.babies.locations[baby]["x"]][this.babies.locations[baby]["y"]]=5;
			} else if (this.world.map[randomNeighbor["x"]][randomNeighbor["y"]]==1){

			} else if (this.world.map[randomNeighbor["x"]][randomNeighbor["y"]]==3){
				this.hostiles.kill(randomNeighbor["x"], randomNeighbor["y"]);
				this.world.map[randomNeighbor["x"]][randomNeighbor["y"]]=0;
				
			}
		}		
    }    
}

function moveHostiles(){
    for(hostile=0;hostile<this.hostiles.locations.length;hostile++){
		thisHostileNeighbors = this.world.neighborsStatus(this.hostiles.locations[hostile]);
		if (thisHostileNeighbors[3]>3){
				this.world.map[this.hostiles.locations[hostile]["x"]][this.hostiles.locations[hostile]["y"]]=0;
				this.hostiles.kill(this.hostiles.locations[hostile]["x"], this.hostiles.locations[hostile]["y"]);
				
		} else if ((thisHostileNeighbors[3]>=1 && thisHostileNeighbors[3]<=3) || randomNum(1,10)===1){
			randomNeighbor=this.world.randomNonOther(this.hostiles.locations[hostile]);
			if (this.world.map[randomNeighbor["x"]][randomNeighbor["y"]]==0){
				this.world.map[this.hostiles.locations[hostile]["x"]][this.hostiles.locations[hostile]["y"]]=0;
				this.hostiles.move(hostile, randomNeighbor);
				this.world.map[this.hostiles.locations[hostile]["x"]][this.hostiles.locations[hostile]["y"]]=3;
			} else if (this.world.map[randomNeighbor["x"]][randomNeighbor["y"]]==1){

			} else if (this.world.map[randomNeighbor["x"]][randomNeighbor["y"]]==3){
				otherHostileNeighbors = this.world.neighborsStatus(randomNeighbor);								
				if (otherHostileNeighbors[0]+thisHostileNeighbors[3]>5){
					randomOpen=this.world.randomOpen(this.hostiles.locations[hostile]);
					if (randomOpen!==false){
						this.world.map[randomOpen["x"]][randomOpen["y"]]=3;
						this.hostiles.add(randomOpen);
					}
				} 
				
			}
		}
		
    }    
}

function queenTouched(){
	while (true){
		queenSpawn=this.world.farSpawn(this.player.pos);
		if(this.world.okayForTheQueen(queenSpawn)){
			this.world.map[this.queen.pos["x"]][this.queen.pos["y"]]=5;
			this.world.map[queenSpawn["x"]][queenSpawn["y"]]=4;
			this.babies.add(this.queen.pos);
			this.queen.move(queenSpawn);
			

			return;
		}
	}
	
}

function updateStatus(){
	time = new Date();
	duration = time.getTime()-this.begin_time;
	$("#status_div").html("Move:" + this.num_of_moves + " Time:" + Math.floor(duration/1000) 
		+ " Hostiles:" + this.hostiles.locations.length + " Friendlies:" + this.babies.locations.length);
		
	if (this.babies.locations.length>this.hostiles.locations.length){
		$("#win_div").show();
	}
}