<?php
    include("setup.php");
    $img = $_POST['img'];
    $querry = "INSERT INTO Imgs (img) VALUES('$img')";
    $db->exec($querry) or die("Error adding the img :S");
    echo "Img stored";
?>