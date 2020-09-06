<?php
    include("setup.php");

    $ele = ($_POST["ele"] != "")? $_POST["ele"] : "*";

    $data = $myPDO->query("SELECT " . $ele . " FROM " . $_POST["table"] . " WHERE " . $_POST["token"] . ";");
    
    foreach($data as $row) {
        print $row['id'] . " -> " . $row["other"] . "\n";
    }
?>