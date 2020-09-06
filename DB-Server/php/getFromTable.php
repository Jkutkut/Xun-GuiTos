<?php
    include("setup.php");

    // $ele = ($_POST["ele"] != "")? $_POST["ele"] : "*";

    // $data = $myPDO->query("SELECT " . $ele . " FROM " . $_POST["table"] . " WHERE " . $_POST["token"] . ";");
    // echo "SELECT " . $ele . " FROM " . $_POST["table"] . " WHERE " . $_POST["token"] . ";";
    // echo $data;
    // print $myPDO->query($_REQUEST["command"]);
    $d = $myPDO->query("SELECT * FROM tablaEliminar WHERE id=6;");
    // $d = $myPDO->query("" . $_GET["command"]);
    // print $d;
    foreach($d as $row) {
        print $row['id'] . "\n";
    }
?>