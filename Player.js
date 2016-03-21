function Player (spawn){	
	this.pos = spawn;	
	this.move = changePlayerPosition;
}

function changePlayerPosition(newPos){
	this.pos = newPos;
}
