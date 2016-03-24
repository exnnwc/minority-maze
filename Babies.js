function Babies (){
    this.locations = new Array;
    this.add = createBaby;
	this.move = moveBaby;
	this.whosAt = whosAt;
}
function createBaby(location){
	this.locations.push(location);
}

function moveBaby(baby, location){	
	console.log("MOVING BABY #" + baby + " to ", location);
	this.locations[baby]=location;
}

function whosAt(x, y){
	console.log(x, y);
	for(baby=0;baby<this.locations.length;baby++){		
        if (this.locations[baby]["x"]==x && this.locations[baby]["y"]==y){
			console.log(baby);
			return baby;
        }
    }
}