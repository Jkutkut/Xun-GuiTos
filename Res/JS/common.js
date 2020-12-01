var queryString = new Array();

function getQuerry(){
    if (queryString.length == 0) {
        if (window.location.search.split('?').length > 1) {
            var params = window.location.search.split('?')[1].split('&');
            for (let i = 0; i < params.length; i++) {
                let key = params[i].split('=')[0];
                let value = decodeURIComponent(params[i].split('=')[1]);
                queryString[key] = value;
            }
        }
    }
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}


// Conversors

/**
 * Transforms a px unit to a float.
 * @param {string} p string with the pixels in the regex-format "d+ px"
 */
function pixel2float(p){
    return parseFloat(p.substring(0, p.length - 2));
}


// DEBUGING
function clearTables(){
    tablesToClear = [
        "Players",
        "Imgs"
    ];
    for (let i = 0; i < tablesToClear.length; i++){
        clearTable(tablesToClear[i]);
    }
}
/**
 * Clears the content of the sqlite3 table using ajax
 * @param {string} t - Name of the table to clear (case sensitive)
 */
function clearTable(t){
    $.ajax({
        url: 'clearTable.php',
        method: 'post',
        data: {
          table: t
        },
        success: function(data) {
          console.log(data);
        }
      });
}