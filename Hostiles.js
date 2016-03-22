function Hostiles(){
    this.locations = new Array;
    this.add = createHostile;
	this.move = moveHostile;
}
function createHostile(location){
	this.locations.push(location);
}

function moveHostile(hostile, location){
	this.locations[hostile]=location;
}