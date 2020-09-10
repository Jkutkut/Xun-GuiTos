<?php
    include("setup.php");    
    $querry = 'INSERT INTO Players (name) VALUES(\'' . $_POST['name'] . '\');';
    echo $querry;
    $db->exec($querry);
    echo $_POST["name"] . " player created";
?>
