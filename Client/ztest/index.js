document.addEventListener("deviceready", onDeviceReady, false);
var img;
var currentRow;
var b = new Blob();
function previewFile() {
    // var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
    // var package_name = document.getElementById("pr").value;

    reader.onloadend = function () {
        // img = reader.result;
        if(file.type.match('image.*'))
        {
            img = reader.result;
            // ref.push({"image":image,"service":arr,"package_name":package_name});
        }
        else
        {
            alert("select an image file");
        }
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
    var image1 = encodeURI(img);
    // var b = new Blob();
    b = image1;

    console.log(b);
    console.log(image1);
    //document.write('<img src="'+image+'"/>');
}
function onDeviceReady() {
    var db = window.sqlitePlugin.openDatabase({name:"mydatabase"});
    db.transaction(populateDB, errorCB, successCB);
}
function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id INTEGER PRIMARY KEY AUTOINCREMENT, name,number,image BLOB)');
}
function insertDB(tx) {
    tx.executeSql('INSERT INTO DEMO (name,number,image) VALUES ("' +document.getElementById("txtName").value
                    +'","'+document.getElementById("txtNumber").value+'","' +b+ '")');

}
function goInsert() {
    var db = window.sqlitePlugin.openDatabase({name:"sqlite"});
    db.transaction(insertDB, errorCB, successCB);
}