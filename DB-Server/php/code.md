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

### 02.1
$.ajax({
  url: 'test2.php',
  method: 'post',
  data: {
    'data1': "hola1"
  },
  success: function(data) {
    console.log(data);
  }
});

<?php
    include("setup.php");
    print $_POST['data1']
?>

### 03
$.ajax({
  url: 'test2.php',
  method: 'post',
  data: {
    otherThing: "data from otherThing",
    id: "data from id"
  },
  success: function(data) {
    console.log(data);
  }
});
