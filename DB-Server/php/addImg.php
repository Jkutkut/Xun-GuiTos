<?php
    include("setup.php");
    $user = $_POST['user']; //Name of the user
    $img = $_POST['img']; //Img of the user
    $addImg = "INSERT INTO Imgs (img) VALUES('$img')";
    $db->exec($addImg) or die("Error adding the img :S"); //Store the img or fail

    //Get imgId once it is stored
    $getImgId = 'SELECT imgId FROM Imgs ORDER BY imgId desc limit 1';
    // $imgId = $db->query($getImgId)->fetchArray() or die("Error at getting the correct imgId");
    $imgIdResult = $db->query($getImgId) or die("Error at getting the correct imgId");

    function fetchObject($sqlite3result, $objectType = NULL) {
        $array = $sqlite3result->fetchArray();
    
        if(is_null($objectType)) {
            $object = new stdClass();
        } else {
            // does not call this class' constructor
            $object = unserialize(sprintf('O:%d:"%s":0:{}', strlen($objectType), $objectType));
        }
       
        $reflector = new ReflectionObject($object);
        for($i = 0; $i < $sqlite3result->numColumns(); $i++) {
            $name = $sqlite3result->columnName($i);
            $value = $array[$name];
           
            try {
                $attribute = $reflector->getProperty($name);
               
                $attribute->setAccessible(TRUE);
                $attribute->setValue($object, $value);
            } catch (ReflectionException $e) {
                $object->$name = $value;
            }
        }
       
        return $object;
    }

    // echo $imgIdResult;
    // $imgIdF = $imgIdResult->fetchAll(SQLITE3_ASSOC);
    // $imgIdF = $imgIdResult->fetchArray();
    $imgIdF = fetchObject($imgIdResult)
    // echo "\n";
    // echo "$imgIdF['imgId']";
    // echo "\n";
    print_r($imgIdF);
    // $imgId = $imgIdF['imgId'] or die("Error at getting the correct imgId");
    // echo "\n";
    // echo $imgIdF;
    // echo "\n";

    // //Set an id reference on the Players table
    // $imgIdToPlayers = 'UPDATE Players SET imgId = 32 WHERE name = \'' . $user . '\'';
    // $db->exec($imgIdToPlayers) or die("Error at updating the table");

    // echo "Img stored and linked";
?>