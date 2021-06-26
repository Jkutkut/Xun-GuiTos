var DB = {
    players: null,
    playersPos: null,
    missions: null,
    opinion: null,
    missionTeam: null
}

$(window).resize(resizeTextSize); // When screen size change, adjust text size
resizeTextSize(); // Update the text size with the current screen

/**
 * Updates the CSS properties with the standar Text-Size
 */
function resizeTextSize() {
    let size = $("body").css("height");
    size = Number.parseInt(size.substr(0, size.length - 2) / 50);

    let textSize = [
        ["huge", 3.5],
        ["bigger", 3],
        ["big", 2.5],
        ["normal", 2],
        ["small", 1.5],
        ["detail", 1]
    ]
    for (let e of textSize) {
        $(":root").css("--" + e[0] + "Text", e[1] * size + "px");
    }

    console.log("Screen resized");
}

/**
 * Updates the background acording to the current score of missions
 * @param {number} resistencia - Missions won by the resistance
 * @param {number} chunguitos - Missions won by the chunguitos
 */
 function changeBackground(resistencia, chunguitos) {
    if (resistencia >= 3) {
        $("body").css("background", "var(--blue)");
    }
    else if (chunguitos >= 3) {
        $("body").css("background", "var(--red)");
    }
    else { // Normal
        const intensidad = {
            resistencia: [
                5,
                15,
                30
            ],
            chunguitos: [
                90,
                70,
                55
            ]
        };
        $("body").css("background", "linear-gradient(180deg, var(--blue) " + intensidad.resistencia[resistencia] + "%, var(--red) " + intensidad.chunguitos[chunguitos] + "%)");
    }
}



// Connectivity
var queryString = new Array();
var dataBase = {};

/**
 * Get all the information addressed in the URL and store it on the queryString object.
 */
function getQuerry(){
    if (queryString.length == 0) {
        if (window.location.search.split('?').length > 1) { // If there're arguments to store
            // Get them
            var params = window.location.search.split('?')[1].split('&');
            for (let i = 0; i < params.length; i++) { // For each argument
                let d = params[i].split('='); // Split key-value

                queryString[d[0]] = decodeURIComponent(d[1]);
            }

            if (queryString.username && !queryString.pId) { // If username stored but pId missing
                console.warn("pId not selected");

                $.ajax({ // Get pId and store it
                    url: "getpId",
                    method: "get",
                    data:{
                        username: queryString.username
                    },
                    success: function(data) {
                        console.log("pId recovered: " + data);
                        queryString["pId"] = parseInt(data);
                    }
                });
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
    return dataURL;
    // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function getPlayers() {
    let f = function(data) {
        try{
            dataBase.players = jQuery.parseJSON(data);
        }
        catch(error) { // If error, set the players as empty array (should never be executed)
            dataBase.players = jQuery.parseJSON("[]");
        }
        console.log("players array updated");
    }
    $.ajax({
        url: 'getPlayers.php',
        method: 'post',
        success: f
    });
}


function go2page(url, extraData={}) {
    let extra = [];
    for (const v of Object.entries(queryString)) {
        extra.push(v.join("="))
    }
    for (const v of Object.entries(extraData)) {
        extra.push(v.join("="))
    }
    // console.log(url + "?" + extra.join("&"));
    window.location.href = url + "?" + extra.join("&");
}


// Asinc functions using promises
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Allows to execute $.ajax method periodically until the spected result is returned by the server or until the triesLeft are 0.
 * @param {Object} petition - JavaScript object with the argument of the $.ajax(XXXXXX) method.
 * @param {any} spected - Spected result of the petition.
 * @param {number} ms - Time to wait between petitions in milliseconds.
 * @param {number} triesLeft - Number of tries until the device stops making petitions.
 * @returns 
 */
const asyncInterval = async (petition, spected, ms, triesLeft = 10000) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            if (await $.ajax(petition) == spected) {
                resolve();
                clearInterval(interval);
            } 
            else if (triesLeft <= 1) {
                reject();
                clearInterval(interval);
            }
            triesLeft--;
        }, ms);
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

/**
 * Whenever the inputed string is a valid integer.
 * @param {String} str - String to compare.
 * @returns (boolean) Result.
 */
function isInt(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseInt(str)) // ...and ensure strings of whitespace fail
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
        "Imgs",
        "Opinion"
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