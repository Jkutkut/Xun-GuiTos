<?php
    include("setup.php");
    $myPDO->exec("DELETE FROM " . $_GET['table'] . ";");
    // $myPDO->query("DELETE FROM " . $_GET['table'] . ";");
    print "DELETE FROM " . $_GET['table'] . ";";
?>