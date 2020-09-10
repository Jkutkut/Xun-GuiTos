<?php
    include("setup.php");
    $db->exec("DELETE FROM " . $_POST['table'] . ";");
    // print "DELETE FROM " . $_GET['table'] . ";";
?>