## Access database:

### 01
$.ajax({
  url: 'test.php',
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

### 02
$.ajax({
  url: 'test2.php',
  method: 'post',
  data: {
    'data1': "hola1"
    'data2': "hoooola2"
  },
  success: function(data) {
    console.log(data);
  }
});

<?php
    include("setup.php");

    print $_POST['data1']
    print $_POST['data2']
?>
