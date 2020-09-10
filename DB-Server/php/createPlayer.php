<?php
    include("setup.php");
    // $myPDO->query('INSERT INTO Players ("name") VALUES("' . $_POST['name'] . '");');
    // echo 'INSERT INTO Players ("name") VALUES("' . $_POST['name'] . '");' . "\n";
    // echo $_POST["name"] . " player created";

    $sql = 'INSERT INTO projects(project_name) VALUES(:project_name)';
    $stmt = $myPDO->pdo->prepare($sql);
    // $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':project_name', $projectName);
    $stmt->execute();
?>
