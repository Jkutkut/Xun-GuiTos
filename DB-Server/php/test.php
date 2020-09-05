<?php
    include("config.php");

    $result = $myPDO->query("SELECT * FROM phpDB;");
    foreach($result as $row) {
        print $row['id'] . "\n";
    }
?>