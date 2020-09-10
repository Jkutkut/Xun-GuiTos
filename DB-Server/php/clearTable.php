<?php
    include("setup.php");
    $db->exec("DELETE FROM $_POST['table'];");
?>