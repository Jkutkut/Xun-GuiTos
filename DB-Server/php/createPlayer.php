<?php
    include("setup.php");
    $name = $_POST['name'];
    $querry = "INSERT INTO Players (name) VALUES('$name')";
    echo $querry;
    
    // $result = $db->query('SELECT * FROM Players');
    // foreach($result as $row) {
    //     print $row['name'] . "\n";
    // }
    $db->exec('BEGIN');
    $db->exec($querry) or die("Error at creating player :S");
    $db->exec('COMMIT');
    
    
    
    echo $_POST["name"] . " created\n";

    
?>
