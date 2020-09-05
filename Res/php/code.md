## Access database:
$.ajax({
  url: 'php/test.php',
  success: function(data) {
    alert(data);
    console.log(data);
  }
});

<?php
    $myPDO = new PDO('sqlite:/home/ubuntu/DB/mydatabase.db');
    $result = $myPDO->query("SELECT * FROM phpDB;");
    foreach($result as $row) {
        print $row['id'] . "\n";
    }
?>