<?php
    $myPDO = new PDO('sqlite:/home/ubuntu/DB/mydatabase.db');
    $result = $myPDO->query("SELECT * FROM phpDB;");
    foreach($result as $row) {
        print $row['id'] . "\n";
    }
?>