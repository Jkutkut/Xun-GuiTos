<?php
    include("setup.php");
    $ta = $_POST['table'];
    $querry = "INSERT INTO Players (name) VALUES('$name')";
    $db->exec($querry) or die("Error at creating player :S");
    echo "Table cleared: " . $ta;
?>