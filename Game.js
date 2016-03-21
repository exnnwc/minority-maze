function Game(){
	this.movePlayer=movePlayer;

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
	
	

	
	this.world.display();
}

function movePlayer(direction, holdingShift){
    if (direction === "Left" && this.player.pos["x"]>1){
		if (this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]==0){			
			this.world.map[this.player.pos["x"]-1][this.player.pos["y"]]=1;				
			this.world.map[this.player.pos["x"]][this.player.pos["y"]]=0;
			this.player.move({x:this.player.pos["x"]-1, y:this.player.pos["y"]});
		} 				
	}
		/*
        other_there = is_there_an_other_here(player_x-1, player_y);
        if (!other_there){
            player_x--;
        } else if (other_there && holdingShift && player_x>2 && !is_there_an_other_here(player_x-2, player_y)){
            kill_other(player_x-1, player_y);
            spawn_hostile(player_x-1, player_y);
            player_x-=2;
        }
    
    } else if (direction === "Right" && player_x<sizeOfX){
        other_there = is_there_an_other_here(player_x + 1, player_y);
        if (!other_there){
            player_x++;
        } else if (other_there && holdingShift){
            kill_other(player_x+1, player_y);
            spawn_hostile(player_x+1, player_y);
            player_x+=2;
        }

    } else if (direction === "Up" && player_y>1){
        other_there = is_there_an_other_here(player_x, player_y-1);
        if (!other_there){
            player_y--;
        } else if (other_there && holdingShift){
            kill_other(player_x, player_y-1);
            spawn_hostile(player_x, player_y-1);
            player_y-=2;
        }

    } else if (direction === "Down" && player_y<sizeOfY-1){
        other_there = is_there_an_other_here(player_x, player_y+1);
        if(!other_there){
            player_y++;
        } else if (other_there && holdingShift){
            kill_other(player_x, player_y+1);
            spawn_hostile(player_x, player_y+1);
            player_y+=2;
        }

    }
	*/
	this.world.display();
}