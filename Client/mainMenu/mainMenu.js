var height, pollBtnState;
const POLLUPDATEPERIOD = 5000;

window.onload = function() {
    getQuerry(); //function from common.js

    /** CSS */
    height = pixel2float($("body").css("height"));
    $("body").css("font-size", height * 0.014);


    $("#11").click(function() {
        console.log($("#11").css("background"));
        $("#11").css("background", "red");
    });
    
    $("#LeftBtn").click(function(){vote(true);});
    $("#RightBtn").click(function(){vote(false);});

    // GetPlayers
    // $.ajax({
    //     url: "players",
    //     method: "get",
    //     success: function(data) {
    //         console.log(data);
    //         updatePlayers(data);
    //     }
    // });
    updatePlayers(debugPlayers);

    // $.ajax({
    //     url: "missions",
    //     method: "get",
    //     success: function(data) {
    //         console.log(data);
    //         updateMissions(data);
    //     }
    // });
    updateMissions(debugMissions)

    // $.ajax({
    //     url: "pollStatus",
    //     method: "get",
    //     success: function(data) {
    //         console.log(data);
    //         updatePoll(data);
    //     }
    // });
}


/** Main functions */
/**
 * @param {number} n - Number of players
 * @returns Generator with the id of the players Divs in counterClockwise order.
 */
function *playerIterator(n) {
    if (n < 5 || n > 10 || !Number.isInteger(n)){ //if n not on the correct range or not an int
        throw "Error at showPlayers: The value show an int be between 5 and 10, both inclusive.";
    }

    yield "MainPlayer";
    yield 43; // Always
    if (n > 6) yield 33;
    yield 23; // Always
    if (n > 8) yield 13;
    if (n % 2 == 0) yield 12;   
    if (n > 8) yield 11;
    yield 21; // Always
    if (n > 6) yield 31;
    yield 41; // Always
}

/**
 * Updates the screen with the players given
 * @param {Obj[]} players - Array with the objects with the player's data.
 */
function updatePlayers(players) {
    console.log(players)
    DB.players = players; // Store the players on a variable for future consult
    let len = players.length;
    showPlayers(len);

    let pIte = playerIterator(len);
    let current = pIte.next();
    let index = 0;
    // console.log(queryString)
    while(players[index].name != queryString.username) {
        index++; // While the first is not my name, go to the next
        if (index === len) {
            throw new Error("Name not found");
        }
    }

    DB.playersPos = new Array(len); // Store player on the position relative to the user (index: pId of the user; value: divId of the user)
    while (!current.done) {
        DB.playersPos[index] = current.value; // Store player on the position relative to the user (index: pId of the user; value: divId of the user)

        let content = players[index];

        $("#userName" + current.value).text(content.name); // Update the name of the user



        // Get and update img
        
        current = pIte.next();
        index = (index + 1) % len;
    }
}

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


function updateMissions(missions) {
    console.log(missions)
    let i;
    for (i = 0; i < missions.length; i++) {
        if (missions[i].active == true) {
            break;
        }
        let color = "var(--chunguitoColor)";
        if (missions[i].mRes == 1) { // If mission was successful
            color = "var(--resistanceColor)";
        }
        
        $("#missionSticker" + (i + 1)).css("background", color);
    }
    $("#missionSticker" + (i + 1)).addClass("cMissionSticker");
    console.log("Leader -> " + DB.players[missions[i].leaderId - 1].name + " " + missions[i].leaderId + " => " + DB.playersPos[missions[i].leaderId - 1]);
    
    // SELECT LEADER
    $(".torch").attr("src", "../../Res/img/empty.png");
    $("#torch" + DB.playersPos[missions[i].leaderId - 1]).attr("src", "../../Res/img/torch.png");

    // CONVERSOR OF PLAYERS NEEDED ON EACH MISSION

    // UPDATE PLAYERS NEEDED ON EACH MISSION

    // IF I AM LEADER, ENABLE CREATE TEAM
}

/** Poll zone */
/**
 * Given the input, show it on screen and calculate the current result of the poll.
 * @param {Array} data - Array with the result of each player (Example: [{val: 0}])
 * @see DB-Logic to see the meaning of each value.
 */
function updatePoll(data){
    let si = 0, no = 0;
    for (let d of data) { // For each player
        if (d.val == 1) si++; // If vote is positive
        else if (d.val == -1) no++; // If negative
    }
    $("#PollText1").text("Sí: " + si);
    $("#PollText2").text("No: " + no);
    $("#PollText3").text("Misión: " + ((si > no)? "Aceptada" : "Denegada")); //mission valid -> aceptada; mission invalid -> denegada
}

/**
 * Updates the vote of the player and sends it to the Raspberry.
 * @param {boolean} v - Whenever the btn pressed is Yes (true) or No (false). 
 */
function vote(v){
    // pollBtnState = Current status of the btns
    if (v == undefined || v == pollBtnState) { //if empty argument or they are the same, clear vote
        pollBtnState = 0; //reset var
    }
    else if(v) { // If v == true => Yes
        pollBtnState = 1;
    }
    else { // If v == false => No
        pollBtnState = -1;
    }

    $.ajax({
        url: "changeOpinion.php",
        method: "post",
        data: {
            user: queryString.username,
            opinion: pollBtnState
        },
        success: function(data) {
            console.log(data);
        }
    });
}


/* PopUp zone */
/**
 * Takes the input mission and shows the popUp with the result of the mission.
 * @param {obj} mission - Mission to use for the popUp
 */
 function openPopUp(mission) {
    if (mission.active || mission.vYes === null || mission.vNo === null) {
        throw new Error("The mission hasn't finish");
    }
    console.log($("#resistenciaPopUp").css("display"));
    
    // Select correct popUp
    let id = "#chunguitosPopUp"; // Show chunguitos'
    if (mission.mRes == 0) {
       id = "#resistenciaPopUp"; // Show resistencia
    }
    $(".popUp").css("display", "none"); // Hide all popUps
    $(id).css("display", "block"); // Show the important one

    // Update popUp's score
    $(".smallLabel").text(
        "Éxito: " + mission.vYes +
        " -- Fracaso: " + mission.vNo
    );
    
    $(".popUpFrame").css("display", "flex"); // Show the frame with the popUps
}
/**
 * Closes the frame will all the popUps
 */
function closePopUp() {
    $(".popUpFrame").css("display", "none");
}



// debug
const debugPlayers = [
    {"pId":1,"name":"jorge","groupPos":1,"pType":0},
    {"pId":2,"name":"paula","groupPos":2,"pType":0},
    {"pId":3,"name":"ana","groupPos":3,"pType":1},
    {"pId":4,"name":"adri","groupPos":4,"pType":0},
    {"pId":5,"name":"laura","groupPos":5,"pType":1},
    {"pId":6,"name":"Juan","groupPos":6,"pType":0},
    {"pId":7,"name":"Pepa","groupPos":7,"pType":0},
    {"pId":8,"name":"Esmeralda","groupPos":8,"pType":0},
    {"pId":9,"name":"Luis","groupPos":9,"pType":0},
    {"pId":10,"name":"Paco","groupPos":10,"pType":0}
];

var debugMissions = [
    {
        mId: 1,
        active: false,
        leaderId: 3,
        vYes: 4,
        vNo: 1,
        mRes: 1
    },
    {
        mId: 2,
        active: false,
        leaderId: 4,
        vYes: 5,
        vNo: 0,
        mRes: 0
    },
    {
        mId: 3,
        active: true,
        leaderId: 5,
        vYes: null,
        vYes: null,
        mRes: 0
    },
    {
        mId: 4,
        active: false,
        leaderId: 6,
        vYes: null,
        vNo: null,
        mRes: 0
    },
    {
        mId: 5,
        active: false,
        leaderId: null,
        vYes: null,
        vNo: null,
        mRes: 0
    }
];