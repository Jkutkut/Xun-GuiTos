## Access database:

<?php
    include("setup.php");
?>

$.ajax({
  url: 'test.php',
  success: function(data) {
    console.log(data);
  }
});




## Tests:
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
  url: 'test3.php',
  method: 'post',
  data: {
    otherThing: "data from otherThing",
    id: "data from id"
  },
  success: function(data) {
    console.log(data);
  }
});

<?php
    include("setup.php");
    print $_POST['otherThing'];
    print $_POST['id']
?>

### GetFromTable:
$.ajax({
  url: 'getRow.php',
  method: 'post',
  data: {
    ele: "*",
    table: "tablaEliminar",
    token: "id=6"
  },
  success: function(data) {
    console.log(data);
  }
});


### ClearTable: WORKS
$.ajax({
  url: 'clearTable.php',
  method: 'post',
  data: {
    table: "tablaEliminar"
  },
  success: function(data) {
    console.log(data);
  }
});
<?php
    include("setup.php");
    $ta = $_POST['table'];
    $querry = "DELETE FROM " . $ta;
    $db->exec($querry) or die("Error at creating player :S");
    echo "Table cleared: " . $ta;
?>

### GetPage: WORKS
$.ajax({
  url: 'getPage.php',
  method: 'post',
  data: {
    webPage: "waitingRoom.html"
  },
  success: function(data) {
    console.log(data);
  }
});
<?php
    $fileName = $_POST["webPage"];
    $myfile = fopen($fileName, "r") or die("Unable to open the file: " . $fileName . "!");
    echo fread($myfile,filesize($fileName));
    fclose($myfile);
?>

### CreatePlayer: WORKS
$.ajax({
  url: 'createPlayer.php',
  method: 'post',
  data: {
      "name": name //name: "Adrián"
  },
  success: function(data) {
      console.log("DONE");
      console.log(data);
  }
});

<?php
    include("setup.php");
    $name = $_POST['name'];
    $querry = "INSERT INTO Players (name) VALUES('$name')";
    $db->exec($querry) or die("Error at creating player :S");
    echo "Player created: " . $name;
?>

