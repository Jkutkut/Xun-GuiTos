<?php
    include("setup.php");
    echo "DELETE FROM $_POST['table'];"
    // $db->exec("DELETE FROM $_POST['table'];");
?>
<?php
    include("setup.php");
    $table = $_POST['name'];
    $querry = "DELETE FROM $_POST['table'];";
    $db->exec($querry) or die("Error at clearing the table :S");
    echo $name . " cleared";
?>
