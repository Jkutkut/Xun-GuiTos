<?php
    include("setup.php");
    $db->query('INSERT INTO Players ("name") VALUES("' . $_POST['name'] . '");');
    // $db->query('INSERT INTO Players (name) VALUES("adri");');
    echo 'INSERT INTO Players ("name") VALUES("' . $_POST['name'] . '");' . "\n";
    echo $_POST["name"] . " player created";

    // $sql = 'INSERT INTO Players ("name") VALUES("' . $_POST['name'] . '");';
    // $stmt = $myPDO->prepare($sql);
    // // // $stmt = $this->pdo->prepare($sql);
    // // $stmt->bindValue('name', $_POST['name']);
    // $stmt->execute();
?>
