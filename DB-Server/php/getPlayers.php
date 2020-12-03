<?php
    include("setup.php");

    $querry = "SELECT * FROM Players";
    $results = $db->query($querry) or die("Error at getting the players");
    
    echo "data:\n";
    while ($row = $results->fetchArray()) {
        // var_dump($row);
        echo "{\"pid\":\"" . $row["pId"] . "\", \"name\":\"" . $row["name"] . "\", \"groupPos\":\"" . $row["groupPos"] . "\", \"imgId\":\"" . $row["imgId"] . "\"}";
    }
    echo "\nend";
?>