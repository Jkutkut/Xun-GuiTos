<?php
    include("setup.php");
    $user = $_POST['user']; //Name of the user
    $img = $_POST['img']; //Img of the user
    $query = "INSERT INTO Imgs (img) VALUES('$img')";
    $db->exec($query) or die("Error adding the img :S"); //Store the img or fail

    $imgId = $db->query("SELECT imgId FROM Imgs WHERE img = 'hola'"); //Get imgId once stored

    $db->exec("UPDATE Players SET imgId = $imgId WHERE name = $user");

    echo "Img stored and linked";
?>