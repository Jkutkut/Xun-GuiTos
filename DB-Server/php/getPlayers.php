<?php
    include("setup.php");

    $querry = "SELECT * FROM Players";
    $results = $db->query($getImgId) or die("Error at getting the players");

    while ($row = $results->fetchArray()) {
        var_dump($row);
    }
?>