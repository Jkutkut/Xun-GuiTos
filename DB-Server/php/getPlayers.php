<?php
    include("setup.php");

    $querry = "SELECT * FROM Players;";
    $results = $db->query($querry) or die("Error at getting the players");
    
    function row2jsonPlayer($r){
        return "{\"pId\":\"" . $r["pId"] . "\", \"name\":\"" . $r["name"] . "\", \"groupPos\":\"" . $r["groupPos"] . "\", \"imgId\":\"" . $r["imgId"] . "\"}";
    }

    if($row = $results->fetchArray()) {
        echo "[";
        echo row2jsonPlayer($row);
        
        while ($row = $results->fetchArray()) {
            echo ",";//",\n";
            echo row2jsonPlayer($row);
        }
        echo "]";
    }
    else {
        // echo "No players found :S";
        echo "[]";
    }
?>