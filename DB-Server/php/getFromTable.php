<?php
    include("setup.php");

    $ele = ($_POST["ele"] != "")? $_POST["ele"] : "";

    // $data = $myPDO->exec("SELECT " . $ele . " FROM " . $_POST["table"] . " WHERE " . $_POST["token"]);
    // print $data;
    print "SELECT " . $ele . " FROM " . $_POST["table"] . " WHERE " . $_POST["token"];
?>