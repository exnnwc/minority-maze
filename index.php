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
            $(document).on("keypress", "body", function (event) {
                if (event.key.substr(0,5)=="Arrow"){
                   move(event.key.substr(5, (event.key.length-5)), event.shiftKey);
                }
            });
        populate_with_others();
        spawn_player();
        displayWorld();
            setInterval(
            moveHostiles(), 1000);
        });
    </script>
</head>

<body>
<div id='world_div'></div>
</body>

</html>
