<?php
    include("setup.php");
    $name = $_POST['name'];
    $querry = "INSERT INTO Players (name) VALUES('$name')";
    $db->exec($querry) or die("Error at creating player :S");
    echo "Player created: " . $name;
?>
