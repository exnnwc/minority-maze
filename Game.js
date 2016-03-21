function Game(){
	this.movePlayer=movePlayer;
    this.moveHostiles=moveHostiles;
	this.world = new World(50, 25);
	this.maxNumOfOthers = this.world.sizeOfX * this.world.sizeOfY * (50/100);		


	
	
	this.player = new Player(this.world.randomSpawnPoint());	
	this.world.map[this.player.pos["x"]][this.player.pos["y"]]=1;
	
	this.others = new Others()        
    numOfOthers = 0;
    while (numOfOthers<this.maxNumOfOthers){
		numOfOthers++;
        spawn = this.world.randomSpawnPoint();
		this.world.map[spawn["x"]][spawn["y"]]=2;		
		this.others.add(spawn);
    }
	
    this.hostiles = new Hostiles();	
   
	
	this.world.display();
}

function movePlayer(direction, holdingShift){
    if (direction === "Left" && this.player.pos["x"]>1){
		if (this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]==0){			
			this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"]-1, y:this.player.pos["y"]});
		} else if (holdingShift && this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]==2
          && this.player.pos["x"]>2 && this.world.map[this.player.pos["x"]-2][this.player.pos["y"]]==0){
            this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]=3;
            this.hostiles.add({x:this.player.pos["x"]-1, y:this.player.pos["y"]});
			this.world.map[this.player.pos["x"]-2][this.player.pos["y"]]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"]-2, y:this.player.pos["y"]});
        }
	} else  if (direction === "Right" && this.player.pos["x"]<this.world.sizeOfX){
		if (this.world.map[this.player.pos["x"]+1][this.player.pos["y"]]==0){			
			this.world.map[this.player.pos["x"]+1][this.player.pos["y"]]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"]+1, y:this.player.pos["y"]});
		} else if (holdingShift && this.world.map[this.player.pos["x"]+1][this.player.pos["y"]]==2
          && this.player.pos["x"]<this.world.sizeOfX-2 && this.world.map[this.player.pos["x"]+2][this.player.pos["y"]]==0){
            this.world.map[this.player.pos["x"]+1][this.player.pos["y"]]=3;
            this.hostiles.add({x:this.player.pos["x"]+1, y:this.player.pos["y"]});
			this.world.map[this.player.pos["x"]+2][this.player.pos["y"]]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"]+2, y:this.player.pos["y"]});
        }
	} else if (direction === "Up" && this.player.pos["y"]>1){
		if (this.world.map[this.player.pos["x"]][this.player.pos["y"]-1]==0){			
			this.world.map[this.player.pos["x"]][this.player.pos["y"]-1]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"], y:this.player.pos["y"]-1});
		} else if (holdingShift && this.world.map[this.player.pos["x"]][this.player.pos["y"]-1]==2
          && this.player.pos["y"]>2 && this.world.map[this.player.pos["x"]][this.player.pos["y"]-2]==0){
            this.world.map[this.player.pos["x"]][this.player.pos["y"]-1]=3;
            this.hostiles.add({x:this.player.pos["x"], y:this.player.pos["y"]-1});
			this.world.map[this.player.pos["x"]][this.player.pos["y"]-2]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"], y:this.player.pos["y"]-2});
        }
	} else if (direction === "Down" && this.player.pos["y"]<this.world.sizeOfY){
		if (this.world.map[this.player.pos["x"]][this.player.pos["y"]+1]==0){			
			this.world.map[this.player.pos["x"]][this.player.pos["y"]+1]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"], y:this.player.pos["y"]+1});
		} else if (holdingShift && this.world.map[this.player.pos["x"]][this.player.pos["y"]+1]==2
          && this.player.pos["y"]<this.world.sizeOfY-2 && this.world.map[this.player.pos["x"]][this.player.pos["y"]+2]==0){
            this.world.map[this.player.pos["x"]][this.player.pos["y"]+1]=3;
            this.hostiles.add({x:this.player.pos["x"], y:this.player.pos["y"]+1});
			this.world.map[this.player.pos["x"]][this.player.pos["y"]+2]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"], y:this.player.pos["y"]+2});
        }
	}
	this.world.display();
}

function moveHostiles(){
    for(hostile=0;hostile<this.hostiles.locations.length;hostile++){
        openNeighbors=listOpenNeighbors(this.hostiles.locations[hostile]);
    }    
}
