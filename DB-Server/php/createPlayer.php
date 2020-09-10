<?php
    include("setup.php");
    // $myPDO->query('INSERT INTO Players ("name") VALUES("' . $_POST['name'] . '");');
    // echo 'INSERT INTO Players ("name") VALUES("' . $_POST['name'] . '");' . "\n";
    // echo $_POST["name"] . " player created";

    $sql = 'INSERT INTO Players ("name") VALUES("' . $_POST['name'] . '");';
    $stmt = $myPDO->prepare($sql);
    // $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue('name', $_POST['name']);
    $stmt->execute();
?>
