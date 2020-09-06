<?php
    include("setup.php");

    $ele = "*"
    if($_POST["ele"] != "") {
        $ele = $_POST["ele"]
    }
    $data = $myPDO->exec("SELECT " . $ele . " FROM " . $_POST[""] . " WHERE " . $_POST["token"]);
    print $data
?>