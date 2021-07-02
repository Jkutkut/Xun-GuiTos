const STATES = {
    SETUP: 0,
    ROUND: 1,
    MISSION: 2,
    END: 3,
    0: "Setup",
    1: "Round",
    2: "Mission",
    3: "End"
}

var leader = {
    index: null
}

/**
 * Update the UI with the current state of the game.
 * @param {number} cState - Current state
 */
function updateState(cState) {
    $("#currentStatus").text(STATES[cState]);
}

/* PlayerList */

/**
 * Update players list.
 * @param {obj} players - player object from DB
 */
function updatePlayers() {
    for (let p of DB.players) {
        renamePlayer(p.pId, p.name);
    }
}

/**
 * Changes the index of the leader and adds the icon to the desired player.
 * @param {number} leaderIndex index (1 based) of the player (pId of the player).
 */
function updateLeader(leaderIndex){
    leader.index = leaderIndex;
    $("#rootMenu_leaderIcon").remove();
    $("#rootMenu_leaderIcon").appendTo(`.P${leaderIndex}`);
}


/**
 * Renames the selected player on the playerList.
 * @param {number} index - index (1 based) of the desired player
 * @param {string} name - name to change the player to.
 */
function renamePlayer(index, name){
    $(`#P${index}_name`).text(name); //update div
    $(`.P${index}_name`).text(name); //update div on gridstrap
}


function getPlayersOrder() {
    let newOrder = [];
    let index = 1;
    for (let child of $("#playersList")[0].childNodes) {
        let id = $(child).attr("id");
        if (id !== undefined) {
            id = parseInt(id.substr(1));
            if (!isNaN(id)) {
                if (id > DB.players.length) { // If empty tag found
                    continue; // Player not valid, go to the next one
                }
                newOrder.push({pId: id, groupPos: index++});               
            }
        }
    }
    return newOrder;
}


/* MISSIONS */

function updateMissions() {
    let missionsEnded = true;
    for (let m of DB.missions) {
        // console.log(m);
        $(`#M${m.mId}pollResult`).text("");
        let result = "Result: ";
        if (m.active == 1) {
            result = "Active";
            missionsEnded = false; // From this mission foward, all missions are not ended
            
            let yes = 0, no = 0;
            for (let o of DB.opinion) {
                console.log(o);
                if (o.val == 1) yes++;
                else if (o.val == -1) no++;
            }
            if (yes + no > 0) {
                $(`#M${m.mId}pollResult`).text(`Yes: ${yes} -- No: ${no}`);
            }
        }
        else if (m.mRes == 0) { // Round won by resistance
            result = "Resistencia";
        }
        else if (m.mRes == 1) {
            result = "Chunguitos";
        }
        else { // If mission not started
            result = "";
        }
        $(`#M${m.mId}result`).text(result);

        if (m.leaderId != null) { // If leader selected
            let leaderName, leaderPId;
            for (let p of DB.players) {
                if (p.pId == m.leaderId) {
                    leaderName = p.name;
                    leaderPId = p.pId;
                    break;
                }
            }
            $(`#M${m.mId}leader`).text(`Leader: ${leaderName}`);
            if (m.active == 1) {
                updateLeader(leaderPId);
            }
        }
        else { // If no leader selected
            $(`#M${m.mId}leader`).text("");
        }

        // Player logic
        let players = [], suc = 0, fail = 0;
        for (let p of DB.missionTeam) { // For each
            if (p.mId == m.mId) { // If player went to the current mission
                players.push(DB.players[p.pId - 1].name); // Add the player to the array
                
                if (p.vote == 0) suc++;
                else if (p.vote == 1) fail++;
            }
        }
        if (players.length == 0) { // If no players on this mission
            $(`#M${m.mId}players`).text("");
        }
        else { // If players, show them
            $(`#M${m.mId}players`).text(`Players: ${players.join(", ")}`);
        }

        if (suc + fail > 0) { // If mission done and votation stored
            $(`#M${m.mId}mPoll`).text(`Success: ${suc} -- Failure: ${fail}`);
        }
        else {
            $(`#M${m.mId}mPoll`).text("");
        }
    }
}

window.onload = function(){
    
    update();

    $("#R2P").click(function() {
        $.ajax({
            url: "updatePlayersOrder.php",
            method: "post",
            data: {newOrder: getPlayersOrder()},
            success: function(data) {
                console.log(data);
                $.ajax({
                    url: "startGame",
                    method: "post",
                    success: function(data) {
                        console.log(data);
                        console.warn("Game started");
                        update();
                    }
                });
            },
            error: function(errorThrown) {
                console.warn(errorThrown);
            }
        });
    });

    $("#EndP").click(function() {
        $.ajax({
            url: "endPoll",
            method: "post",
            data: {},
            success: function(data) {
                console.log(data);
                update();
            },
            error: function(errorThrown) {
                console.warn(errorThrown);
            }
        });
    });

    // $("#HardReset").click(function() {
    //     $.ajax({
    //         url: "hardReset",
    //         method: "post",
    //         data: {},
    //         success: function(data) {
    //         },
    //         error: function(errorThrown) {
    //             console.warn(errorThrown);
    //         }
    //     });
    // });

    $("#updateBtn").click(function() {
        update();
    });
    setInterval(update, 5000);
}

$(function(){
	$('#playersList').gridstrap({
		/* default options */
	});
});


function update() {
    $.ajax({
        url: "getDB",
        method: "get",
        success: (data) => {
            DB.players = data.players; 
            DB.missions = data.missions;
            DB.missionTeam = data.missionTeam;
            DB.opinion = data.opinion;
            
            // console.log(data);
            updateState(data.currentState);
            updatePlayers();
            updateMissions();
        },
        error: (e) => {
            DB.players = debugPlayers;
            DB.missions = debugMissions;
            DB.missionTeam = [];
            updatePlayers();
            updateMissions();
        }
    });
}