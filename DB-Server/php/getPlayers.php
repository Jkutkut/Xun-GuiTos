<?php
    include("setup.php");

    $querry = "SELECT * FROM Players";

    while ($row = $results->fetchArray()) {
        var_dump($row);
    }
?>