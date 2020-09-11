<?php

    $sql = 'SELECT img FROM Imgs';


    $query = $db->query($sql);
    $row = $query->fetchArray(SQLITE3_ASSOC);

    header('Content-Type: image/png');
    echo $row['user_profile_picture'];
?>