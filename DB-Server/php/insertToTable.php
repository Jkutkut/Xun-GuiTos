<?php
    include("setup.php");
    $myPDO->exec("INSERT INTO " . $_POST['table'] . "(" . $_POST['properties'] . ") VALUES(" . $_POST['data'] . ")'");
?>