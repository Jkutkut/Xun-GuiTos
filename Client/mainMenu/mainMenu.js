/**
 * Current state of the user's poll status.
 */
var pollBtnState;

/**
 * The index of the current Mission (1º mission => 0).
 */
var currentMissionIndex;

/**
 * Whenever I am the leader of the mission.
 */
var amIaLeader = false;

/**
 * If the popUp with the status of the previous mission has been shown.
 */
var popUpShowed = false;

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

/**
 * Ajax argument to decide if the user should go to the next state
 */
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

window.onload = function() {
    // Create poll btns events    
    $("#LeftBtn").click(()=>{vote(1);});
    $("#RightBtn").click(()=>{vote(-1);});


    getDB((data)=>{
        if (data.currentState == 0) { // If the user shouldn't be here
            throw new Error("The game has not started!");
        }
        successGetDBf(data); // else, process data.
        }, 
        errorGetDBf // If error getting data, execute this function
    );

    //Update periodically the following functions

    setInterval(update, 500);

    asyncInterval(goToNextState, "t", 500);
}

/**
 * Executes the function to get the content of the DB using the functions:
 * @see successGetDBf
 * @see errorGetDBf
 */
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
    
    if (n == 7 || n == 8) {
        for (let col = 1; col <= 3; col+=2) {
            $(`#3${col}`).css("--r", 4);
        }
    }
    else { // Reset playersContainers positions:
        for (let col = 1; col <= 3; col+=2) {
            $(`#3${col}`).css("--r", 5);
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

/**
 * Adds a click-eventListener on each of the playersContainers of the screen to enable selection of players.
 * @see this function is only executed if the user is the leader.
 */
function enableUserPicking() {
    for (let player of DB.playersPos) { // For each ID of the players containers
        $("#"+player.divId).click(function() { // When player container clicked
            pickUser(player);
        })
    }
}

/**
 * Removes the click-eventListener on each of the playersContainers.
 * @see This function is the antagonist of enableUserPicking.
 * @see This function is executed when the user is the leader.
 */
function disableUserPicking() {
    $(".playerDiv").off( "click", "**" );
}

/**
 * Updates the weapon of the given user. This function has 2 modes:
 * - If value not given, the user is (un)selected to go to the current mission (if maximum not reached yet).
 * - If value given, updates the given user to the given value/state
 * 
 * @param {Obj} user - Object from the server with the information of the desired player
 * @param {number|optional} value - If given, the desired value of the user. If not, the value is calculated.
 * 
 * @see this function is executed with value always and without it when the player has selected this player
 */
function pickUser(user, value=null) {
    let empty = "../../Res/img/empty";
    let extension = ".png";

    let newSrc;
    if (value === null) {
        let response = { // Ajax argument to send to the server with the new state of the player
            url: "", // filled later
            method: "post",
            data: {
                mId: currentMissionIndex + 1,
                pId: user.player.pId
            },
            success: (data) => {
                update();
            }
        }
        if ($("#gun"+user.divId).attr("src") == empty + extension) { // if selecting user (Now empty img)
            let playersAlreadyOnMission = 0;

            for (let i = DB.missionTeam.length - 1, p; i >= 0; i--) { // For each player selected for a mission
                p = DB.missionTeam[i];
                if (p.mId != currentMissionIndex + 1) break; // if this player is not in this mission, the rest aren't too => end
                playersAlreadyOnMission++;
            }            
            
            if (playersAlreadyOnMission >= playersPerM[DB.players.length][currentMissionIndex]) {
                // If attempting to select user and maximum players selected reached
                console.error("Maximum players selected reached");
                return;
            }
            
            newSrc = randomWeapon(user); // Get a URL of a random weapon

            //Update response
            response.url = "selectPlayer4mission";
        }
        else { // if unselecting user (already with gun)
            newSrc = empty + extension; // Get empty url

            // Update response
            response.url = "removePlayer4mission";
        }

        $.ajax(response); // Send new state to server
    }
    else {
        if (value == 1) { // if the player has been selected
            newSrc = randomWeapon(user); 
        }
        else if (value == 0) { // If the player hasn't been selected
            newSrc = empty + extension;
        }
        else {
            throw new Error("The value for pickUser is not valid");
        }
    }

    $("#gun"+user.divId).attr("src", newSrc); // change gun img element to the new one
}

/**
 * Returns a random link to a weapon.
 * @param {Obj} user - Object representing the player of the game from the server.
 * @returns The link to the weapon.
 */
function randomWeapon(user) {
    const MAX = 35; // Amount of weapons stored (1-MAX)
    const gun = "../../Res/img/guns/0"; // Directory of the gun and the common name
    const extension = ".png";

    // Get random index
    let today = new Date();
    let r = (user.player.pId + today.getDay() + today.getHours()) % MAX + 1;
    if (r < 10) r = "0"+r; // All files have same length
    return gun + r + `-gun${extension}`;
};



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

/**
 * Updates the vote of the player and sends it to the Server.
 * @param {boolean} v - Whenever the btn pressed is Yes (true) or No (false). 
 * @see pollBtnState = Current status of the btns
 */
function vote(v, updateDB=true){
    // Reset btn status
    $(".pollBtn").css("font-weight", "normal");
    $(".pollContainer").css("width", "85%");

    if ((v == undefined || v == pollBtnState) && updateDB || //if empty argument or they are the same and vote btn pressed
        (v == 0 && !updateDB)) { //if just updating the screen, clear vote
        pollBtnState = 0; //reset var
    }
    else if(v == 1) { // If v == 1 => Yes
        pollBtnState = 1;
        $("#LeftBtnLabel").css("font-weight", "bold");
        $("#RightBtn").css("width", "60%");
    }
    else { // If v == -1 => No
        pollBtnState = -1;
        $("#RightBtnLabel").css("font-weight", "bold");
        $("#LeftBtn").css("width", "60%");
    }

    if (!updateDB) return; // if just updating the screen, end here.

    $.ajax({ // Update the server with opinion
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