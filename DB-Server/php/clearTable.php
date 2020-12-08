<?php
    include("setup.php");
    $ta = $_POST['table'];
    $querry = "DELETE FROM " . $ta;
    $db->exec($querry) or die("Error clearing the table '$ta' :S");
    echo "Table cleared: " . $ta;
?>