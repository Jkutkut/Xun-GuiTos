<?php
    include("setup.php");
    echo 'INSERT INTO Players (name) VALUES("' . $_POST['name'] . '");' . "\n";

    // $db->exec('INSERT INTO Players (name) VALUES("' . $_POST['name'] . '");');
    echo $_POST["name"] . " player created";
?>
