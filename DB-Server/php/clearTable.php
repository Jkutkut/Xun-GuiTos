<?php
    include("setup.php");
    $myPDO->exec("DELETE FROM " . $_POST['table'] . ";");
?>