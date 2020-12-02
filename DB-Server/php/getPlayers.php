<?php
    include("setup.php");

    $querry = "SELECT * FROM Players";
    $results = $db->query($getImgId)->fetchArray() or die("Error at getting the players");

    while ($row = $results->fetchArray()) {
        var_dump($row);
    }
?>