var height, pollBtnState;
window.onload = function() {
    /** CSS */
    height = $("body").css("height");
    height = parseFloat(height.substring(0, height.length - 2));
    $("body").css("font-size", height * 0.014);

    /** Missions' scores */
    let e = ["M", "nPlayers"]; //id of elements on the score/mission div
    let size = [0.2, 0.6, 0.15].map(x => x * 0.9); //height multiplier of those elements
    let s = $("#scoreM1").css("height"); //height of the container
    s = parseFloat(s.substring(0, s.length - 2));

    for (let i = 0; i < e.length; i++){// for each element inside a Mission score container
        $("#" + e[i] + 1).css("font-size", (s * size[i]) + "px"); //adjust the font-size to fit the space avalible
    }
    $("#nPlayers1").css("width", $("#nPlayers1").css("height")); //nPlayersX has a circle background, make the width = height
    $("#nPlayers1").css("border-radius", s * 0.5); // The radius of the circle is the height/2

    let score = $("#scoreM1"); //get the container with the 1º mission score to make the rest
    for(let i = 2; i <= 5; i++){ //for all the rest
        let newS = score.clone(); //duplicate the container and change the parameters:
        newS.attr("id", "scoreM" + i); //id
        let children = newS.children();
        for(let j = 0; j < children.length; j++){ //for all the children on the container
            children[j].id = e[j] + i; //change the id of the children
        }
        $("#scoreContainer").append(newS); //add the new container to the div with all of the missions
        $("#M" + i).text("Misión " + i); //also change the title of the mission
    }
    $("#scoreM4").append(jQuery('<i id="score-specialM">2 fallos</i>')); //on the 4º, add the special label
    $("#score-specialM").css("font-size", (s * size[2]) + "px"); //adjust the size to fit the container



    /** Players' containers */
    let playersContainer = $("#playersContainer"); //The div element with the rows where the player's divs + btns are stored
    let mainPlayer = $("#mainPlayer"); //The div element with the info of the host of the device

    let h = mainPlayer.css("height"); //get current height of mainplayer div
    h = parseFloat(h.substring(0, h.length - 2));
    $('#mainPlayerIcon').attr("src", "../../Res/img/default_user.png");
    $('#mainPlayerIcon').css("height", (h * 0.75) + "px"); //adjust the size of the icon to fit the div
    mainPlayer.css("height", h + "px"); //Also lock this height

    for(let i = 1; i < 5; i++) { //Make the rest of the users
        //create a row
        let row = jQuery('<div id="Row' + i + '" class="horizontalCols" style="--h: 100%;--c: 3; grid-row: ' + i + '"></div>');
        for(let j = 1; j <= 3; j += 2){
            let p = mainPlayer.clone();
            p.attr("id", i + "" + j);
            p.css("--pos", j);
            row.append(p);
            if(i == 1 && j == 1){
                let p = mainPlayer.clone();
                p.attr("id", "12");
                p.css("--pos", 2);
                row.append(p);
            }
        }
        row.appendTo(playersContainer);
    }

    $("#11").click(function() {
        console.log($("#11").css("background"));
        $("#11").css("background", "red");
    });

    /** Poll zone */
    for (let i = 2; i < 5; i++){
        let p = jQuery('<div id="PollContainer' + (i - 1) + '" class="playercontainer PollContainer" style="--pos:2"></div>');
        p.append(jQuery('<strong id="PollText' + (i - 1) + '" class="PollText"></strong>'))
        p.css("height", h);
        p.insertAfter($("#" + i + 1));
        $("#PollText" + (i - 1)).css("font-size", h * 0.20);
    }

    $("#PollText1").text("Sí: 10");
    $("#PollText2").text("No: 10");
    $("#PollText3").text("Misión: Aceptada");
    $("#PollText3").css("padding-top", "30%");
    $("#PollText3").css("text-decoration", "underline");

    //Poll btns
    $("#LefttBtn").css("height", h);
    $("#LeftBtnLabel").css("font-size", h * 0.25);
    $("#RightBtn").css("height", h);
    $("#RightBtnLabel").css("font-size", h * 0.25);
    
    $("#LeftBtn").click(function(){vote(true);});
    $("#RightBtn").click(function(){vote(false);});
}


/** Main functions */

/**
 * Given the number of players, show the containers on the correct positions.
 * @param {number} n - The number of players on the game.
 * @throws error if the value is not on the range [5, 10]
 */
function showPlayers(n){
    if (n < 5 || n > 10 || !Number.isInteger(n)){ //if n not on the correct range or not an int
        throw "Error at showPlayers: The value show an int be between 5 and 10, both inclusive.";
    }
    // Rows: always: 2, 4, self; n > 6: 3; n > 8: 1; if even, 12 on;
    let index = new Set(); //set of row numbers to show on screen
    if (n > 6) index.add(3);
    if (n > 8) index.add(1);
    
    let display = function(id, visible){ //function to switch the visibility of the container given as input
        $(id).css("display", (visible)? "flex" : "none");
    }

    for(let i = 1; i < 4; i += 2){ //for each row to change
        let visible = index.has(i); // if not on set -> no need to drawit => delete it
        for(let j = 1; j <= 3; j += 2){ //change both containers (left and right)
            display("#" + i + j, visible);
        }
    }
    display("#12", n % 2 == 0); //if even, add the one on the top middle
}

/** Poll zone */
/**
 * Given the input, show it on screen and calculate the current result of the poll.
 * @param {number} si number of people who chose the positive option.
 * @param {number} no number of people who chose the negative option.
 */
function updatePoll(si, no){
    $("#PollText1").text("Sí: " + si);
    $("#PollText2").text("No: " + no);
    $("#PollText3").text("Misión: " + ((si > no)? "Aceptada" : "Denegada")); //mission valid -> aceptada; mission invalid -> denegada
}
function vote(v){
    // pollBtnState = Current status of the btns
    if (v == undefined || v == pollBtnState) { //if empty argument or they are the same, clear vote
        pollBtnState = undefined; //reset var
    }
    else if(v) {
        pollBtnState = true;
    }
    else {
        pollBtnState = false;
    }
    console.log(pollBtnState);
}