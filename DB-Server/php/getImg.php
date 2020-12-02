<?php
    include("setup.php");
    $getImgId = "SELECT imgId from Players WHERE pId = \'" . $_POST['user'] . "\'";
    $imgId = $db->query($getImgId);

    $sql = 'SELECT img FROM Imgs WHERE imgId = \'' . $imgId . '\'';

    $query = $db->query($sql);
    $row = $query->fetchArray(SQLITE3_ASSOC);

    header('Content-Type: image/png');
    echo $row['user_profile_picture'];
?>