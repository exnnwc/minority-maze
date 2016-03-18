world_x = 50;
world_y = 30;
  
function displayWorld(){
    if(!typeof hostiles_x === "undefined"){
        console.log(hostiles_x, hostiles_y);
    }
    world="";
    for(y=1;y<world_y;y++){
        world = world + "<div>";
        for (x=1;x<world_x;x++){
            other_here=is_there_an_other_here(x, y);
            hostile_here= is_there_a_hostile_here(x,y);
            world = world + "<span class='cell ";
            if (other_here){
                world = world + " other";
            } else if (hostile_here){
                world = world + " hostile";
            }
            world = world + "'>";
            if (other_here) {
                world = world + "@";
            } else if (x===player_x && y===player_y){
                world = world + "O";
            } else if (hostile_here){
                world = world + "X";
            }
            
            world = world + "</span>";
        }
        world = world + "</div>";
    }
    $("#world_div").html(world);
}
function spawn_player(){
    player_coord = spawn_point();
    player_x = player_coord["x"];
    player_y = player_coord["y"];
}

function spawn_queen(){
    queen_coord = spawn_point();
    queen_x = queen_coord["x"];
    queen_y = queen_coord["y"];

}
hostiles_x=[];
hostiles_y=[];
function spawn_hostile(x, y){
    hostiles_x.push(x);
    hostiles_y.push(y);
    console.log("hostile spawned at (" + x + ", " + y + ")");
}
function spawn_point(){
    while (true){
        rand_x = randomNum(1,world_x);
        rand_y = randomNum(1, world_y); 
        if (!is_there_an_other_here(rand_x, rand_y)){
            return {x:rand_x, y:rand_y};
        }
    }
    
}
function move(direction, holdingShift){
//	console.log(direction, holdingShift);
    if (direction === "Left" && player_x>1){
        other_there = is_there_an_other_here(player_x-1, player_y);
        if (!other_there){
            player_x--;
        } else if (other_there && holdingShift && player_x>2 && !is_there_an_other_here(player_x-2, player_y)){
            kill_other(player_x-1, player_y);
            spawn_hostile(player_x-1, player_y);
            player_x-=2;
        }
    
    } else if (direction === "Right" && player_x<world_x){
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

    } else if (direction === "Down" && player_y<world_y-1){
        other_there = is_there_an_other_here(player_x, player_y+1);
        if(!other_there){
            player_y++;
        } else if (other_there && holdingShift){
            kill_other(player_x, player_y+1);
            spawn_hostile(player_x, player_y+1);
            player_y+=2;
        }

    }
    displayWorld();
    //console.log(player_x, player_y);
}

function randomNum(a, b){
    return Math.floor((Math.random() * b) + a);
}


    others_x=[];
    others_y=[];
function populate_with_others(){
    percent_others = 50;
    max_num_of_others = world_x * world_y * (percent_others/100);
    num_of_others = 0;
    while (num_of_others<max_num_of_others){
        num_of_others++;
        rand_x=randomNum(1,world_x);
        rand_y = randomNum(1, world_y);
        if (!is_there_an_other_here(rand_x, rand_y)){
            others_x.push(rand_x);    
            others_y.push(rand_y);    
        }
    }
}
function kill_other(x, y){
    for(other=0;other<others_x.length;other++){
        if (x==others_x[other] && y==others_y[other]){
            others_x.splice(other, 1);
            others_y.splice(other, 1);
        }
    }

}
function is_there_an_other_here(x, y){
    for(other=0;other<others_x.length;other++){
        if (others_x[other]===x && others_y[other]===y){
            return true;
        }
    } 
    return false;
}
function is_there_a_hostile_here(x,y){
    if (typeof hostiles_x === "undefined"){
        return false;
    }
    for(hostile=0;hostile<hostiles_x.length;hostile++){
        if (hostiles_x[hostile]===x && hostiles_y[hostile]===y){
            return true;
        }
    } 
    return false;
}


function whats_here(x,y){
    if (is_there_an_other_here(x,y)){
        return 1;
    } else if(is_there_a_hostile_here(x,y)){
        return 2;
    }
    return 0;
}
function kill_hostile(x,y){
    for(hostile=0;hostile<hostiles_x.length;hostile++){
        if (x==hostiles_x[other] && y==hostiles_y[other]){
            hostiles_x.splice(other, 1);
            hostiles_y.splice(other, 1);
        }
    }	
}
function move_hostiles(){
	if (hostiles_x.length>0){
		console.log(hostiles_x);
	}
    for(hostile=0;hostile<hostiles_x.length;hostile++){
		
        randDirection=randomNum(1,4);
		console.log(hostiles_x[hostile], hostiles_y[hostile], hostile, randDirection);
		console.log(hostiles_x[hostile]-1, hostiles_y[hostile], whats_here(hostiles_x[hostile]-1, hostiles_y[hostile]), hostile, randDirection);
        //1 - up, 2 - right, 3 - down, 4 - left
        if (randDirection==4 ){
			console.log(hostiles_x[hostile]-1, hostiles_y[hostile], whats_here(hostiles_x[hostile]-1, hostiles_y[hostile]), hostile, randDirection);
        } else if (randDirection==2){
			
        }
    }
	displayWorld();
}
