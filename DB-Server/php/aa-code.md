## Access database:

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

### GetImg:
$.ajax({
  url: 'getImg.php',
  method: 'get',
  data: {
    name: "jorge"
  },
  success: function(data) {
    //console.log(data);
    var image = new Image();
    image.src = data;
    document.body.appendChild(image);
  }
});