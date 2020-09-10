<?php
    include("setup.php");
    // echo 'INSERT INTO Players (name) VALUES("' . $_POST['name'] . '");' . "\n";
    
    $querry = 'INSERT INTO Players (name) VALUES(\'' . $_POST['name'] . '\');' . "\n";
    echo $querry;
    $db->exec($querry);
    echo $_POST["name"] . " player created";
?>
