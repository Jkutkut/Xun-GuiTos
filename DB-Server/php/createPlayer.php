<?php
    include("setup.php");
    $myPDO->query('INSERT INTO Players ("name") VALUES("' . $_POST['name'] . '")');
    echo $_POST["name"] . " player created";
?>