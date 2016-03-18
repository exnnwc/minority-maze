<!DOCTYPE html>
<html>
<head>
    <style>
        .cell{
            float:left;
            width:20px;
            height:20px;
            border:1px solid black;
            text-align:center;
        }
        .other{
            color:grey;
        }
        .hostile{
            color:red;
        }
        div{
            clear:both;
        }
    </style>
    <script src="http://localhost/rla/js/jquery-2.1.4.min.js"></script>
    <script src="js.js"></script>
    <script>
        $(document.body).ready(function () {
			$(document).on("keydown", "body", function (event) {
                direction = {37:"Left", 38:"Up", 39:"Right", 40:"Down"}
				if (event.keyCode>36 && event.keyCode<41){
                   move(direction[event.keyCode], event.shiftKey);
				}
                
            });
        populate_with_others();
        spawn_player();
        displayWorld();
		x=0;
		setInterval(function(){
		move_hostiles();
		if (x>5){
			return;
		}
		}, 1000);
		});
    </script>
</head>

<body>
<div id='world_div'></div>
</body>

</html>
