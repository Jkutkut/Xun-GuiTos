<?php
    include("setup.php");

    $result = $myPDO->query("SELECT * FROM phpDB;");
    foreach($result as $row) {
        print $row['id'] . "\n";
    }
?>