// Connectivity
var queryString = new Array();
var dataBase = {};

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

function getPlayers() {
    let f = function(data) {
        try{
            dataBase.players = jQuery.parseJSON(data);
        }
        catch(error) {
            dataBase.players = jQuery.parseJSON("[]");
        }
    }
    $.ajax({
        url: 'getPlayers.php',
        method: 'post',
        success: f
    });
}


// Analyzers
/**
 * Checks whenever an element e is (phisically) inside of a element p
 * @param {object} e - Element to check if it is inside ({x: number, y: number, w: number, h: number})
 * @param {object} p - Parent ({x: number, y: number, w: number, h: number})
 * @param {boolean} conversion - (optional) if the input is a HTML element (true) or it is a object with the div2disposition function format
 * @returns {boolean} The result of the analysis
 */
function stillIn(e, p, conversion = true) {
    if (conversion){
        e = div2disposition(e);
        p = div2disposition(p);
    }
    // return !(e.x < 0 || e.y < 0 ||
    return !(e.x < p.x || e.y < p.y ||
        e.x + e.w > p.x + p.w || 
        e.y + e.h > p.y + p.h);
}

// Conversors
/**
 * 
 * @param {object} e - Query element
 * @returns {object} {x: top}
 */
function div2disposition(e) {
    let posi = e.position();
    return {
        x: posi.left,
        y: posi.top,
        w: pixel2float(e.css("width")),
        h: pixel2float(e.css("height"))
    }
}

/**
 * Transforms a px unit to a float.
 * @param {string} p string with the pixels in the regex-format "d+ px"
 */
function pixel2float(p){
    return parseFloat(p.substring(0, p.length - 2));
}


// DEBUGING
/**
 * Clears the content of all the tables on the sqlite3 database.
 */
function clearTables(){
    tablesToClear = [
        "Players",
        "Imgs"
    ];
    for (let t of tablesToClear){
        clearTable(t);
    }
}
/**
 * Clears the content of the sqlite3 table using ajax.
 * @param {string} t - Name of the table to clear (case sensitive).
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