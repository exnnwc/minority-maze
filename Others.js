function Others(){
	this.locations = new Array;	
	this.add = createOther;
}

function createOther(location){
	this.locations.push(location);
}

function killOther(otherID){
	this.locations.splice(otherID, 1);
}