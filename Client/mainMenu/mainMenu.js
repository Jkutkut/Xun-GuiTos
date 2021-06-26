var height, pollBtnState;

var pSelected4mission = 0;
var currentMissionIndex;

var playersPerM = {
    5: [ 2, 3, 2, 3, 3 ],
    6: [ 2, 3, 4, 3, 4 ],
    7: [ 2, 3, 3, 4, 4 ],
    8: [ 3, 4, 4, 5, 5 ],
    9: [ 3, 4, 4, 5, 5 ],
    10:[ 3, 4, 4, 5, 5 ]
}

const POLLUPDATEPERIOD = 5000;

window.onload = function() {
    getQuerry(); //function from common.js
    
    $(".gun").attr("src", "../../Res/img/empty.png");
    
    $("#LeftBtn").click(()=>{vote(true);});
    $("#RightBtn").click(()=>{vote(false);});

    // GetPlayers
    // $.ajax({
    //     url: "players",
    //     method: "get",
    //     success: function(data) {
    //         console.log(data);
    //         updatePlayers(data);

    //         $.ajax({
    //             url: "missions",
    //             method: "get",
    //             success: function(data) {
    //                 console.log(data);
    //                 updateMissions(data);
    //             }
    //         });
    //     }
    // });
    $.ajax({
        url: "getDB",
        method: "get",
        success: (data) => {
            console.log(data);
            updatePlayers(data.players);
            updateMissions(data.missions);
            // updateSelected(data.)
            updatePoll(data.opinion);
        }
    });
    
    // updatePlayers(debugPlayers);
    // updateMissions({missions: debugMissions, missionTeam: 0});

    getUpdatedPoll();

    // updatePoll(debugOpinion);
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
    if (n > 6) yield 43;
    yield 33; // Always
    if (n > 8) yield 23;
    yield 13; // Always
    if (n % 2 == 0) yield 12;
    yield 11; // Always
    if (n > 8) yield 21;
    yield 31; // Always
    if (n > 6) yield 41;
}

/**
 * Updates the screen with the players given
 * @param {Obj[]} players - Array with the objects with the player's data.
 */
function updatePlayers(players) {
    DB.players = players; // Store the players on a variable for future consult
    let len = players.length;
    showPlayers(len);

    let pIte = playerIterator(len);
    let current = pIte.next();
    let index = 0;

    while(players[index].name != queryString.username) {
        index++; // While the first is not my name, go to the next
        if (index === len) {
            throw new Error("Name not found");
        }
    }


    let today = new Date();

    DB.playersPos = new Array(len); // Store player on the position relative to the user:
    // (index: pId of the user; value: {divId: divId of the user, player: object of the player})

    while (!current.done) {
        DB.playersPos[index] = { // Store the player divId and the player itself
            divId: current.value,
            player: players[index]
        };

        let content = players[index];

        $("#userName" + current.value).text(content.name); // Update the name of the user

        iconIndex = players[index].pId * 5 - (today.getDay() + today.getHours()) % 5;
        $("#icon" + current.value).attr("src", "../../Res/img/users/user" + iconIndex +".png"); // Update the name of the user

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
    $(".playerDiv").css("display", "none");
    let playersDivIte = playerIterator(n);
    while (true) {
        let pDiv = playersDivIte.next();
        $("#" + pDiv.value).css("display", "flex");
        if (pDiv.done == true) break; // If done, end
    }
}


function updateMissions(missions) {
    DB.missions = missions;
    let i;
    for (i = 0; i < DB.missions.length; i++) {
        if (DB.missions[i].active == true) {
            currentMissionIndex = i; //store current index
            break;
        }
        let color = "var(--chunguitoColor)";
        if (DB.missions[i].mRes == 1) { // If mission was successful
            color = "var(--resistanceColor)";
        }
        
        $("#missionSticker" + (i + 1)).css("background", color);
    }

    if (i > 0) { // If mission done
        openPopUp(DB.missions[i - 1]);
    }

    $("#missionSticker" + (i + 1)).addClass("cMissionSticker");
    // console.log("Leader -> " + DB.players[DB.missions[i].leaderId - 1].name + " " + DB.missions[i].leaderId + " => " + DB.playersPos[DB.missions[i].leaderId - 1].divId);
    
    // SELECT LEADER
    $(".torch").attr("src", "../../Res/img/empty.png");
    $("#torch" + DB.playersPos[DB.missions[i].leaderId - 1].divId).attr("src", "../../Res/img/torch.png");
    if (typeof DB.playersPos[DB.missions[i].leaderId - 1].divId == "string") { // If leader is this user
        enableUserPicking(); // IF I AM LEADER, ENABLE CREATE TEAM
    }

    for (let j = 1; j <= 5; j++) {
        $("#missionSticker" + j).text(playersPerM[DB.players.length][j - 1]);
    }

    if (DB.players.length < 7) {
        $("#specialMtag").css("display", "none");
    }

}

function updateSelectedPlayers(selected) {
    DB.missionTeam = selected; //Update DB

    
}


function enableUserPicking() {
    for (let player of DB.playersPos) {
        console.log(player);
        $("#"+player.divId).click(function() {
            pickUser(player);
        })
    }
}

function pickUser(user, value=null) {
    let empty = "../../Res/img/empty";
    let gun = "../../Res/img/guns/0";
    let extension = ".png";

    let newSrc;
    if (value === null) {
        if ($("#gun"+user.divId).attr("src") == empty + extension) { // if selecting user
            if (pSelected4mission >= playersPerM[DB.players.length][currentMissionIndex]) {
                // If attempting to select user and maximun players selected reached
                console.warn("Maximum players selected reached");
                return;
            }
            
            let r = Math.round(Math.random() * 35) + 1;
            if (r < 10) r = "0"+r;
            
            pSelected4mission++; // New user added
            newSrc = gun + r + "-gun" + extension;
        }
        else { // if unselecting user
            pSelected4mission--; // user removed
            newSrc = empty + extension;
        }
    }
    else {
        newSrc = value;
    }

    console.log("player selection updated");
    $("#gun"+user.divId).attr("src", newSrc)
}








/** Poll zone */
/**
 * Given the input, show it on screen and calculate the current result of the poll.
 * @param {Array} data - Array with the result of each player (Example: [{val: 0}])
 * @see DB-Logic to see the meaning of each value.
 */
function updatePoll(data){
    let si = [], no = [];
    for (let d of data) { // For each player
        if (d.val == 1) {
            si.push(DB.players[d.pId - 1].name); // If vote is positive
        }
        else if (d.val == -1) {
            no.push(DB.players[d.pId - 1].name); // If negative
        }
    }

    let siResult = "---", noResult = "---", mResult = "---"
    
    if (si.length > 0 || no.length > 0) {
        siResult = si.join(", ");
        noResult = no.join(", ");

        if (si.length > no.length) {
            mResult = "Aceptada";
        }
        else {
            mResult = "Denegada";
        }
    }
    else {
        siResult = "---";
        noResult = "---";
    }

    $("#siPlayers").text(siResult);
    $("#noPlayers").text(noResult);
    $("#missionStatus").text(mResult); //mission valid -> aceptada; mission invalid -> denegada
}

/**
 * Updates the vote of the player and sends it to the Raspberry.
 * @param {boolean} v - Whenever the btn pressed is Yes (true) or No (false). 
 */
function vote(v){
    // pollBtnState = Current status of the btns
    if (v == undefined || v == pollBtnState) { //if empty argument or they are the same, clear vote
        pollBtnState = 0; //reset var
        $(".pollBtn").css("font-weight", "normal");
    }
    else if(v) { // If v == true => Yes
        pollBtnState = 1;
        $("#RightBtnLabel").css("font-weight", "bold");
    }
    else { // If v == false => No
        pollBtnState = -1;
        $("#LeftBtnLabel").css("font-weight", "bold");
    }

    $.ajax({
        url: "changeOpinion.php",
        method: "post",
        data: {
            pId: queryString.pId,
            opinion: pollBtnState
        },
        success: function(data) {
            getUpdatedPoll();
            console.log(data);
        }
    });
}

function getUpdatedPoll() {
    $.ajax({
        url: "pollStatus",
        method: "get",
        success: function(data) {
            updatePoll(data);
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
        vNo: 2,
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

var debugOpinion = [
    {
        "pId":1,
        "val":1
    },
    {
        "pId":2,
        "val":1
    },
    {
        "pId":3,
        "val":1
    },
    {
        "pId":4,
        "val":1
    },
    {
        "pId":5,
        "val":1
    },
    {
        "pId":6,
        "val":1
    },
    {
        "pId":7,
        "val":1
    },
    {
        "pId":8,
        "val":1
    },
    {
        "pId":9,
        "val":1
    },
    {
        "pId":10,
        "val":1
    }
];