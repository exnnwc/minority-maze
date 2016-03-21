

function randomNum(a, b){
    return Math.floor((Math.random() * b) + a);
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






    others_x=[];
    others_y=[];

function kill_other(x, y){
    for(other=0;other<others_x.length;other++){
        if (x==others_x[other] && y==others_y[other]){
            others_x.splice(other, 1);
            others_y.splice(other, 1);
        }
    }

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



function kill_hostile(x,y){
	
    for(hostile=0;hostile<hostiles_x.length;hostile++){
		console.log (typeof hostiles_x[hostile], typeof hostiles_y[hostile], typeof x, typeof y);
		console.log("Hostile #" + hostile + "("+ hostiles_x[hostile] + ", " 
		  + hostiles_y[hostile] +") being checked out for (" + x + ", " + y +")...");
        if (x===hostiles_x[hostile] && y===hostiles_y[hostile]){
			console.log("hostile killed at (" + x +", " + y + ")");
            hostiles_x.splice(hostile, 1);
            hostiles_y.splice(hostile, 1);
        }
    }	
}
function move_hostiles(){
	if (hostiles_x.length>0){
		console.log(hostiles_x);
	}
    for(hostile=0;hostile<hostiles_x.length;hostile++){
		
        randDirection=4; //randomNum(1,4);
		//console.log(hostiles_x[hostile], hostiles_y[hostile], hostile, randDirection);
		//console.log(hostiles_x[hostile]-1, hostiles_y[hostile], whats_here(hostiles_x[hostile]-1, hostiles_y[hostile]), hostile, randDirection);
        //1 - up, 2 - right, 3 - down, 4 - left  && whatsHere(hostiles_x[hostile]-1, hostiles_y[hostile])==0
        if (randDirection==4){						
			spawn_hostile(hostiles_x[hostile]-1, hostiles_y[hostile]);			
        } else if (randDirection==2 && whatsHere(hostiles_x[hostile]-1, hostiles_y[hostile])==0){			
			spawn_hostile(hostiles_x[hostile]+1, hostiles_y[hostile]);
        } else if (randDirection==1 && whatsHere(hostiles_x[hostile], hostiles_y[hostile]-1)==0){
			spawn_hostile(hostiles_x[hostile], hostiles_y[hostile]-1);
		} else if (randDirection==3 && whatsHere(hostiles_x[hostile], hostiles_y[hostile]+1)==0){
			spawn_hostile(hostiles_x[hostile], hostiles_y[hostile]+1);
		}
		
    }
	displayWorld();
}
