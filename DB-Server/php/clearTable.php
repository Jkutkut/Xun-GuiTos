<?php
    include("setup.php");
    echo "DELETE FROM $_POST['table'];"
    $db->exec("DELETE FROM $_POST['table'];");
?>