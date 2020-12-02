<?php
    // $db = new PDO('sqlite:/home/ubuntu/DB/mydatabase.db') or die("Ops! I died :S");
    $db = new SQLite3('/home/ubuntu/DB/mydatabase.db') or die("Ops! I died :S");
?>