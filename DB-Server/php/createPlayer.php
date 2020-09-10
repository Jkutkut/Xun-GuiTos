<?php
    include("setup.php");
    $name = $_POST['name'];
    $querry = "INSERT INTO Players (name) VALUES('$name')";
    echo $querry;
    
    echo $db->query('SELECT * FROM Players');

    $db->exec($querry) or die("Error at creating player :S");
    echo $_POST["name"] . " player created\n";

    
?>
