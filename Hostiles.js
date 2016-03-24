function Hostiles(){
    this.locations = new Array;
    this.add = createHostile;
	this.move = moveHostile;
	this.kill = killHostile;
}
function createHostile(location){
	this.locations.push(location);
}

function moveHostile(hostile, location){
	this.locations[hostile]=location;
}

function killHostile(x, y){
    for(hostile=0;hostile<this.locations.length;hostile++){		
        if (x==this.locations[hostile]["x"] && y==this.locations[hostile]["y"]){
            this.locations.splice(hostile, 1);
        }
    }

}