world_x = 50;
world_y = 30;
function displayWorld(){
    world="";
    for(y=1;y<world_y;y++){
        world = world + "<div>";
        for (x=1;x<world_x;x++){
            world = world + "<span class='cell'>";
            if (is_there_an_other_here(x, y)) {
                world = world + "X";
            } else if (x===player_x && y===player_y){
                world = world + "O";
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
function spawn_point(){
    while (true){
        rand_x = randomNum(1,world_x);
        rand_y = randomNum(1, world_y); 
        if (!is_there_an_other_here(rand_x, rand_y)){
            return {x:rand_x, y:rand_y};
        }
    }
    
}
function move(direction){
    console.log(direction);
    if (direction === "Left" && player_x>1  && !is_there_an_other_here(player_x-1, player_y)){
        player_x--;
    } else if (direction === "Right" && player_x<world_x  && !is_there_an_other_here(player_x + 1, player_y)){
        player_x++;
    } else if (direction === "Up" && player_y>1 && !is_there_an_other_here(player_x, player_y-1)){
        player_y--;
    } else if (direction === "Down" && player_y<world_y-1 && !is_there_an_other_here(player_x, player_y+1)){
        player_y++;
    }
    displayWorld();
    console.log(player_x, player_y);
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
function is_there_an_other_here(x, y){
    for(other=0;other<others_x.length;other++){
        if (others_x[other]===x && others_y[other]===y){
            return true;
        }
    } 
    return false;
}
