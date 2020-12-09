<?php
    include("setup.php");
    $user = $_POST['user']; //Name of the user
    $opinion = $_POST['opinion']; // Opinion of the user
    
    $query = "INSERT INTO Opinion (val) VALUES('$opinion') WHERE pId = '$user'";
    $db->exec($query) or die("Error updating opinion of player '$user'"); // Update opinion
    echo "Succeed";
?>