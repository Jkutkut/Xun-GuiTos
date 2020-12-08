<?php
    include("setup.php");
    $name = $_POST['name'];
    $query = "INSERT INTO Players (name) VALUES('$name')";
    $db->exec($query) or die("Error at creating player :S");

    $getpId = "SELECT pId FROM Players WHERE name = '$name'";
    $pIdQuery = $db->query($getpId);
    $row = $pIdQuery->fetchArray(SQLITE3_ASSOC);

    $query = "INSERT INTO Opinion (pId) VALUES('$row['pId']')";
    $db->exec($query) or die("Error at creating opinion for the player");

    echo "Player created: " . $name;
?>
