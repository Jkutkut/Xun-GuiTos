/**
 * The index of the current Mission (1º mission => 0).
 */
var currentMissionIndex;

/**
 * Key: number of players in the game.
 * 
 * Index: number of the mission.
 * 
 * Value: number of players needed for that mission.
 */
var playersPerM = {
    5: [ 2, 3, 2, 3, 3 ],
    6: [ 2, 3, 4, 3, 4 ],
    7: [ 2, 3, 3, 4, 4 ],
    8: [ 3, 4, 4, 5, 5 ],
    9: [ 3, 4, 4, 5, 5 ],
    10:[ 3, 4, 4, 5, 5 ]
}

// GetDB functions

/**
 * Function to execute when data from getDB is received from server.
 * @param {Obj} data - Object from server.
 */
var successGetDBf = (data) => {
    updatePlayers();
    updateMissions();
    updateSelectedPlayers();
    updatePoll();
};

/**
 * Function to execute when error getting data from getDB.
 * @param {Obj} data - Object from server.
 */
var errorGetDBf = (e) => {
    console.error(e);
};

/**
 * Executes the function to get the content of the DB using the functions:
 * @see successGetDBf
 * @see errorGetDBf
 */
 function update() {
    getDB(successGetDBf, errorGetDBf);
}

window.onload = function() {
    // Create poll btns events    
    $("#LeftBtn").click(()=>{vote(1);});
    $("#RightBtn").click(()=>{vote(-1);});

    $(".torch").attr("src", "../../Res/img/torch.png");
    $(".gun").attr("src", "../../Res/img/guns/007-gun.png");
    $(".playerIcon").attr("src", "../../Res/img/users/user13.png");

    getDB((data)=>{
        if (data.currentState == 0) { // If the user shouldn't be here
            throw new Error("The game has not started!");
        }
        successGetDBf(data); // else, process data.
        }, 
        errorGetDBf // If error getting data, execute this function
    );
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
    
    // bottom
    if (n == 6 || n >= 8) yield 42;
    if (n % 2 == 1 || n == 10) yield 43;
    if (n == 6 || n >= 8) yield 44;

    // right side
    yield 35; // always
    if (n > 6) yield 25;

    // top
    yield 12; // always
    if (n == 10) yield 13;
    yield 14; // always
    
    // left side
    yield 31 // always
    if (n > 6) yield 21;

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

    while(DB.players[index].groupPos != 1) { //find the first player
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
        for (let p, i = 0; i < DB.players.length; i++) {
            p = DB.players[i];
            if (p.groupPos == indexGroupPos) {
                player = p;
            }
        }
        DB.playersPos[player.pId - 1] = { // Store the player divId and the player itself
            divId: current.value,
            player: player
        };

        $(`#userName${current.value}`).text(player.name); // Update the name of the user

        iconIndex = (player.pId + today.getDay() + today.getHours()) % 50 + 1;
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
    let playersDivIte = playerIterator(n);
    $(".playerDiv").css("display", "none");
    while (true) {
        let pDiv = playersDivIte.next();
        $(`#${pDiv.value}`).css("display", "flex");
        if (pDiv.done == true) break; // If done, end
    }

    // Bottom
    if (n == 6 || n == 8) {
        for (let i = 2; i <= 4; i+=2) {
            $(`#4${i}`).css("--c", i + 2);
        }
    }
    else {
        for (let i = 2; i <= 4; i+=2) {
            $(`#4${i}`).css("--c", i * 2 - 1);
        }
    }

    // Sides
    if (n < 7) {
        for (let c = 1; c <= 5; c+=4) {
            $(`#3${c}`).css("--r", 4);
        }
    }
    else {
        for (let c = 1; c <= 5; c+=4) {
            $(`#3${c}`).css("--r", 5);
        }
    }

    // Top
    if (n > 5 && n < 10) {
        for (let i = 2; i <= 4; i+=2) {
            $(`#1${i}`).css("--c", i + 2);
        }
    }
    else {
        for (let i = 2; i <= 4; i+=2) {
            $(`#1${i}`).css("--c", i * 2 - 1);
        }
    }
}

/**
 * Having the missions stored on the DB variable, the function analices the current status.
 * 
 * Updates the DOM, changes the background and enables userPicking if leader.
 */
 function updateMissions() {
    let i, mSuccess = 0, mFailure = 0;
    for (i = 0; i < DB.missions.length; i++) {
        if (DB.missions[i].active == true) {
            if (currentMissionIndex !== i) { // If currentMissionIndex not defined or has changed
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

    for (let j = 1; j <= 5; j++) {
        $(`#missionSticker${j}`).text(playersPerM[DB.players.length][j - 1]);
    }

    if (DB.players.length < 7) {
        $("#specialMtag").css("display", "none");
    }

}

/**
 * Having the players selected on the DB variable, search the players on the current mission.
 */
 function updateSelectedPlayers() {
    $(".gun").attr("src", "../../Res/img/empty.png"); // hide all guns

    for (let i = DB.missionTeam.length - 1, p; i >= 0; i--) { // For each player selected for a mission
        p = DB.missionTeam[i];
        if (p.mId != currentMissionIndex + 1) break; // if this player is not in this mission, the rest aren't too => end
        pickUser(DB.playersPos[p.pId - 1], 1);
    }
}

/** Poll zone */
/**
 * Given the input, show it on screen and calculate the current result of the poll.
 * @param {Array} data - Array with the result of each player (Example: [{val: 0}])
 * @see DB-Logic to see the meaning of each value.
 */
 function updatePoll(){
    let si = [], no = [];
    for (let d of DB.opinion) { // For each players' opinion
        if (d.pId == queryString.pId) { // if the player is current user
            vote(d.val, false);
        }
        if (d.val == 1) {
            si.push(DB.players[d.pId - 1].name); // If vote is positive
        }
        else if (d.val == -1) {
            no.push(DB.players[d.pId - 1].name); // If negative
        }
    }

    let siResult = "---", noResult = "---", mResult = "---"
    
    if (si.length > 0 || no.length > 0) { // If someone have updated the poll
        siResult = si.join(", ");
        noResult = no.join(", ");

        if (si.length > no.length) {
            mResult = "Aceptada";
        }
        else {
            mResult = "Denegada";
        }
    } // else, keep variables the same way

    $("#siPlayers").text(siResult);
    $("#noPlayers").text(noResult);
    $("#missionStatus").text(mResult); //mission valid -> aceptada; mission invalid -> denegada
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
    let id = "#chunguitosPopUp"; // Show chunguitos' popUp
    if (mission.mRes == 0) {
       id = "#resistenciaPopUp"; // Show Resistencia's popUp
    }
    $(".popUp").css("display", "none"); // Hide all popUps
    $(id).css("display", "block"); // Show the important one

    let yes = 0, no = 0;
    
    for (let i = DB.missionTeam.length - 1, p; i >= 0; i--) { // For each player selected for a mission
        p = DB.missionTeam[i];
        if (p.mId != currentMissionIndex) break; // if this player is not in last mission, the rest aren't too => end
        if (p.vote == 0) {
            yes++;
        }
        else {
            no++;
        }
    }

    // Update popUp's score
    $(".PopUpMissionResult").text(`Éxito: ${yes} -- Fracaso: ${no}`);
    
    $(".popUpFrame").css("display", "flex"); // Show the frame with the popUps
}

/**
 * Closes the frame will all the popUps.
 */
function closePopUp() {
    $(".popUpFrame").css("display", "none");
}