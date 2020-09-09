<?php
    include("setup.php");
    $myPDO->exec("INSERT INTO Players ('p-id') VALUES(" . $_POST['name'] . ")");
?>