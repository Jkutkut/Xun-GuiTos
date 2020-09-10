<?php
    include("setup.php");
    $ta = $_POST['table'];
    $querry = "DELETE FROM " . $table;
    echo $querry;
    // $db->exec($querry) or die("Error at creating player :S");
    echo "Table cleared: " . $ta;
?>