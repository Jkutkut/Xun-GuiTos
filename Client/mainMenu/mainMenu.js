var height, pollBtnState;

var currentMissionIndex;
var amIaLeader = false;

var popUpShowed = false;

var playersPerM = {
    5: [ 2, 3, 2, 3, 3 ],
    6: [ 2, 3, 4, 3, 4 ],
    7: [ 2, 3, 3, 4, 4 ],
    8: [ 3, 4, 4, 5, 5 ],
    9: [ 3, 4, 4, 5, 5 ],
    10:[ 3, 4, 4, 5, 5 ]
}

const POLLUPDATEPERIOD = 5000;

var goToNextState = {
    url: "canStopWaiting",
    method: 'get',
    data: {
        currentState: 1
    },
    success: function(data) {
        if (data != "f") {
            go2page(data);
        }
    }
}

// GetDB functions
var successGetDBf = (data) => {
    updatePlayers();
    updateMissions();
    updateSelectedPlayers();
    updatePoll();
};
var errorGetDBf = (e) => {
    updatePlayers(debugPlayers);
    updateMissions(debugMissions);
    updateSelectedPlayers([])
    updatePoll(debugOpinion);
};

window.onload = function() {    
    $(".gun").attr("src", "../../Res/img/empty.png");
    
    $("#LeftBtn").click(()=>{vote(1);});
    $("#RightBtn").click(()=>{vote(-1);});

    getDB((data)=>{
        if (data.currentState == 0) {
            throw new Error("The game has not started!");
        }
        successGetDBf(data);
        }, 
        errorGetDBf
    );

    setInterval(update, 500); //Update periodically

    asyncInterval(goToNextState, "t", 500);
}

function update() {
    getDB(successGetDBf, errorGetDBf);
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
function updatePlayers() {
    let len = DB.players.length;
    showPlayers(len);

    let pIte = playerIterator(len);
    let current = pIte.next();
    let index = 0;

    while(DB.players[index].name != queryString.username) { //find the user with that id
        index++; // While the first is not my name, go to the next
        if (index === len) {
            throw new Error("Name not found");
        }
    }


    let today = new Date();

    DB.playersPos = new Array(len); // Store player on the position relative to the user:
    // (index: pId of the user; value: {divId: divId of the user, player: object of the player})

    let indexGroupPos = DB.players[index].groupPos;

    while (!current.done) {
        let player;
        for (let p of DB.players) {
            if (p.groupPos == indexGroupPos) {
                player = p;
            }
        }
        DB.playersPos[player.pId - 1] = { // Store the player divId and the player itself
            divId: current.value,
            player: player
        };

        $(`#userName${current.value}`).text(player.name); // Update the name of the user

        iconIndex = player.pId * 5 - (today.getDay() + today.getHours()) % 5;
        $(`#icon${current.value}`).attr("src", `../../Res/img/users/user${iconIndex}.png`); // Update the name of the user

        // Get and update img
        
        current = pIte.next();
        indexGroupPos = ((indexGroupPos + 1) % (len + 1));
        if (indexGroupPos == 0) indexGroupPos = 1;
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
        $(`#${pDiv.value}`).css("display", "flex");
        if (pDiv.done == true) break; // If done, end
    }
}


function updateMissions() {
    let i, mSuccess = 0, mFailure = 0;
    for (i = 0; i < DB.missions.length; i++) {
        if (DB.missions[i].active == true) {
            if (currentMissionIndex !== i) { // If currentMisisonIndex not defined or has changed
                currentMissionIndex = i; //store current index
                popUpShowed = false; // I need to see the popUp
            }
            break;
        }
        let color;
        if (DB.missions[i].mRes == 0) { // If mission was successful
            color = "var(--resistanceColor)";
            mSuccess++;
        }
        else {
            color = "var(--chunguitoColor)";
            mFailure++;
        }
        
        $(`#missionSticker${(i + 1)}`).css("background", color);
    }

    changeBackground(mSuccess, mFailure);

    if (i > 0 && !popUpShowed) { // If mission already done and popUp not seen yet
        openPopUp(DB.missions[i - 1]);
        popUpShowed = true;
    }

    $(".missionSticker").removeClass("cMissionSticker");
    $(`#missionSticker${(i + 1)}`).addClass("cMissionSticker");


    // SELECT LEADER
    $(".torch").attr("src", "../../Res/img/empty.png");
    $(`#torch${DB.playersPos[DB.missions[i].leaderId - 1].divId}`).attr("src", "../../Res/img/torch.png");
    if (typeof DB.playersPos[DB.missions[i].leaderId - 1].divId == "string") { // If leader is this user
        if (!amIaLeader) { // if I didn't know i was a leader
            amIaLeader = true;
            enableUserPicking(); // IF I AM LEADER, ENABLE CREATE TEAM
        }
    }
    else {
        if (amIaLeader) { // if I didn't know i was no longer a leader
            amIaLeader = false;
            disableUserPicking();
        }
    }

    for (let j = 1; j <= 5; j++) {
        $(`#missionSticker${j}`).text(playersPerM[DB.players.length][j - 1]);
    }

    if (DB.players.length < 7) {
        $("#specialMtag").css("display", "none");
    }

}

function updateSelectedPlayers() {
    $(".gun").attr("src", "../../Res/img/empty.png"); // hide all guns
    for (let p of DB.missionTeam) {
        if (p.mId == currentMissionIndex + 1) { // If missionTeam 
            pickUser(DB.playersPos[p.pId - 1], 1);
        }
    }
}


function enableUserPicking() {
    for (let player of DB.playersPos) {
        $("#"+player.divId).click(function() {
            pickUser(player);
        })
    }
}
function disableUserPicking() {
    $(".playerDiv").off( "click", "**" );
}


function pickUser(user, value=null) {
    let empty = "../../Res/img/empty";
    let gun = "../../Res/img/guns/0";
    let extension = ".png";

    let randomWeapon = () => {
        let today = new Date();
        let r = user.player.pId * 3 - (today.getDay() + today.getHours()) % 3;
        if (r < 10) r = "0"+r;
        return gun + r + `-gun${extension}`;
    };

    let newSrc;
    if (value === null) {
        let response = {
            url: "", // filled later
            method: "post",
            data: {
                mId: currentMissionIndex + 1,
                pId: user.player.pId
            },
            success: (data) => {
                console.log(data);
                update();
            }
        }
        if ($("#gun"+user.divId).attr("src") == empty + extension) { // if selecting user
            let playersAlreadyOnMission = 0;
            for (let p of DB.missionTeam) {
                if (p.mId == currentMissionIndex + 1) playersAlreadyOnMission++;
            }
            if (playersAlreadyOnMission >= playersPerM[DB.players.length][currentMissionIndex]) {
                // If attempting to select user and maximun players selected reached
                console.warn("Maximum players selected reached");
                return;
            }
            
            newSrc = randomWeapon();

            //Update response
            response.url = "selectPlayer4mission";
        }
        else { // if unselecting user
            newSrc = empty + extension;

            // Update response
            response.url = "removePlayer4mission";
        }

        $.ajax(response);
    }
    else {
        if (value == 1) { // if the player has been selected
            newSrc = randomWeapon();
        }
        else if (value == 0) { // If the player hasn't been selected
            newSrc = empty + extension;
        }
        else {
            throw new Error("The value for pickUser is not valid");
        }
    }

    $("#gun"+user.divId).attr("src", newSrc)
}








/** Poll zone */
/**
 * Given the input, show it on screen and calculate the current result of the poll.
 * @param {Array} data - Array with the result of each player (Example: [{val: 0}])
 * @see DB-Logic to see the meaning of each value.
 */
function updatePoll(){
    let si = [], no = [];
    for (let d of DB.opinion) { // For each player
        if (d.pId == queryString.pId) {
            $(".pollBtn").css("font-weight", "normal");
            if (d.val == 1) {
                $("#RightBtnLabel").css("font-weight", "bold");
            }
            else if (d.val == -1) {
                $("#LeftBtnLabel").css("font-weight", "bold");
            }
        }
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
 * Updates the vote of the player and sends it to the Server.
 * @param {boolean} v - Whenever the btn pressed is Yes (true) or No (false). 
 */
function vote(v){
    // pollBtnState = Current status of the btns
    $(".pollBtn").css("font-weight", "normal");

    if (v == undefined || v == pollBtnState) { //if empty argument or they are the same, clear vote
        pollBtnState = 0; //reset var
    }
    else if(v == 1) { // If v == 1 => Yes
        pollBtnState = 1;
        $("#RightBtnLabel").css("font-weight", "bold");
    }
    else { // If v == -1 => No
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
        success: (data) => {
            update();
        },
        error: (e) => {
            console.error("Error attempting to vote");
            console.error(e);
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
    if (mission.mRes === null) {
        throw new Error("The mission hasn't finish");
    }
    
    // Select correct popUp
    let id = "#chunguitosPopUp"; // Show chunguitos'
    if (mission.mRes == 0) {
       id = "#resistenciaPopUp"; // Show resistencia
    }
    $(".popUp").css("display", "none"); // Hide all popUps
    $(id).css("display", "block"); // Show the important one

    
    let yes = 0, no = 0;
    for (let p of DB.missionTeam) {
        if (p.mId == currentMissionIndex) {
            if (p.vote == 0) {
                yes++;
            }
            else {
                no++;
            }
        }
    }
    // Update popUp's score
    $(".PopUpmissionResult").text(`Éxito: ${yes} -- Fracaso: ${no}`);
    
    $(".popUpFrame").css("display", "flex"); // Show the frame with the popUps
}
/**
 * Closes the frame will all the popUps
 */
function closePopUp() {
    $(".popUpFrame").css("display", "none");
}