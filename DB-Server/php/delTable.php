<?php
    include("setup.php");
    $myPDO->exec("DROP TABLE " . $_POST['TableName']);
?>