// Connectivity
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

// Analyzers
/**
 * Checks whenever an element e is (phisically) inside of a element p
 * @param {object} e - Element to check if it is inside ({x: number, y: number, w: number, h: number})
 * @param {object} p - Parent ({x: number, y: number, w: number, h: number})
 * @param {*boolean} noConversion - (optional) if the conversion div-disposition (see function div2disposition) shold be calculated 
 * @returns {boolean} The result of the analysis
 */
function stillIn(e, p, conversion = true) {
    if (conversion){
        e = div2disposition(e);
        p = div2disposition(p);
    }
    return !(e.x < p.x || e.y < p.y ||
        e.x + e.w > p.x + p.w || e.y + e.h > p.y + p.h);
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
        x: posi.top,
        y: posi.left,
        w: pixel2float(e.css("with")),
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