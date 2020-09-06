<?php
    include("setup.php");

    // $ele = ($_POST["ele"] != "")? $_POST["ele"] : "*";

    // $data = $myPDO->query("SELECT " . $ele . " FROM " . $_POST["table"] . " WHERE " . $_POST["token"] . ";");
    // echo "SELECT " . $ele . " FROM " . $_POST["table"] . " WHERE " . $_POST["token"] . ";";
    // echo $data;
    // print $myPDO->query($_REQUEST["command"]);
    $d = $myPDO->query("" . $_GET["command"]);
    print $d;
?>