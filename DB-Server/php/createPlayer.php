<?php
    include("setup.php");    
    $querry = 'INSERT INTO Players (name) VALUES(\'' . $_POST['name'] . '\');';
    echo $querry;
    $db->exec($querry) or die("Error at creating player :S");
    echo $_POST["name"] . " player created";
?>
