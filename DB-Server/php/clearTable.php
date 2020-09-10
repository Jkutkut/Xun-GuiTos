<?php
    include("setup.php");
    $table = $_POST['table'];
    $querry = "DELETE FROM $_POST['table'];";
    $db->exec($querry) or die("Error at clearing the table :S");
    echo $name . " cleared";
?>
