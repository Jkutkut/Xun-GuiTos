<?php
    include("setup.php");
    $myPDO->exec("DELETE FROM " . $_GET['table'] . ";");
?>