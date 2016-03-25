<!DOCTYPE html>
<html>
<head>
    <style>
		#world_div{
			
		}
        .cell{
            float:left;
            width:20px;
            height:20px;
            border:1px dotted grey;
            text-align:center;
        }
        .other{
            background-color:lightgrey;
        }
		.empty{
			border:1px dotted white;
		}
        .hostile{
            color:red;
			border:1px dotted white;
        }
        div{
            clear:both;
        }
		.queen{
			color:black;
			background-color:green;
		}
		.baby{
			color:green;
			border:1px dotted white;
		}
		.player {
			border:1px dotted white;
		}
    </style>
    <script src="http://localhost/rla/js/jquery-2.1.4.min.js"></script>
	<script src="Babies.js"></script>
	<script src="Game.js"></script>
	<script src="Hostiles.js"></script>
	<script src="js.js"></script>
	<script src="Others.js"></script>
	<script src="Player.js"></script>
	<script src="Queen.js"></script>		
    <script src="World.js"></script>
    <script>
        $(document.body).ready(function () {
			game = new Game();
			$(document).on("keydown", "body", function (event) {
                direction = {37:"Left", 38:"Up", 39:"Right", 40:"Down"}
				if (game.isActive===true && event.keyCode>36 && event.keyCode<41){
                   game.movePlayer(direction[event.keyCode], event.shiftKey);				   
                    
				}
                
            });
		});
    </script>
</head>

<body>
<div id='world_div'></div>
<div id='status_div'></div>
</body>

</html>
