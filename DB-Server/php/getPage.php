<?php
    $fileName = $_POST["webPage"];
    // echo "start:\n" . $fileName . "\n end.";
    $myfile = fopen($fileName, "r") or die("Unable to open the file: " . $fileName . "!");
    echo fread($myfile,filesize($fileName));
    fclose($myfile);
?>