var leader = {
    index: null
}

/* PlayerList */

function updatePlayers(players) {
    DB.players = players;
    for (let p of players) {
        renamePlayer(p.pId, p.name);
    }
}

/**
 * Changes the index of the leader and adds the icon to the desired player.
 * @param {number} leaderIndex index (1 based) of the player (pId of the player).
 */
function updateLeader(leaderIndex){
    leader.index = leaderIndex;
    $("#rootMenu_leaderIcon").appendTo("#P" + leaderIndex);
    console.log("Changed to P" + leaderIndex);
}


/**
 * Renames the selected player on the playerList.
 * @param {number} index - index (1 based) of the desired player
 * @param {string} name - name to change the player to.
 */
function renamePlayer(index, name){
    console.log(`${index} => ${name} -> #P${index}_name`);
    $(`#P${index}_name`).text(name); //update div
    $(`.P${index}_name`).text(name); //update div on gridstrap
}


function getPlayersOrder() {
    let newOrder = [];
    for (let p of DB.players) {
        // newOrder.push({pId: p.pId, groupPos: }); // USE ME
        newOrder.push({pId: p.pId, groupPos: p.pId}); // temporal code
    }
    return newOrder;
}


/* MISSIONS */

function updateMissions(missions, missionTeam) {
    DB.missions = missions;
    DB.missionTeam = missionTeam;

    // console.log(missions);
    let missionsEnded = true;
    for (let m of missions) {
        // console.log(m);
        let result = "Result: ";
        if (m.active == 1) {
            result = "Active";
            missionsEnded = false; // From this mission foward, all missions are not ended
        }
        else if (m.mRes == 1) { // Round won by resistance
            result = "Resistencia";
        }
        else if (m.mRes == 0) {
            result = "Chunguitos";
        }
        else { // If mission not started
            result = "";
        }
        $("#M" + m.mId + "result").text(result);

        if (m.leaderId != null) { // If leader selected
            let leaderName, leaderPId;
            for (let p of DB.players) {
                if (p.pId == m.leaderId) {
                    leaderName = p.name;
                    leaderPId = p.pId;
                    break;
                }
            }
            $("#M" + m.mId + "leader").text("Leader: " + leaderName);
            updateLeader(leaderPId);
        }
        else { // If no leader selected
            $("#M" + m.mId + "leader").text("");
        }

        // if (!missionsEnded) break;

        if (m.vYes != null) { // If poll results avalible
            $("#M" + m.mId + "pollResult").text("Yes: " + m.vYes + " --- No: " + m.vNo);
        }
        else {
            $("#M" + m.mId + "pollResult").text("");
        }

        // Player logic
        let players = [];
        let playersId = new Set();
        for (let p of DB.missionTeam) { // For each 
            if (p.mId == m.mId) { // If player went to the current mission
                playersId.add(p.pId); // Add the id
            }
        }
        for (let p of DB.players) {
            if (playersId.has(p.pId)) {
                players.push(p.name);
            }
        }

        if (players.length == 0) { // If no players on this mission
            $("#M" + m.mId + "players").text("");
        }
        else {
            $("#M" + m.mId + "players").text("Players: " + players.join(", "));
        }
    }
}


window.onload = function(){
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
                    }
                });
            },
            error: function(errorThrown) {
                console.warn(errorThrown);
            }
        });
    });

    // $("#EndP").click(function() {
    //     $.ajax({
    //         url: "endPoll.php",
    //         method: "post",
    //         data: {},
    //         success: function(data) {
    //             console.log(data);
    //         },
    //         error: function(errorThrown) {
    //             console.warn(errorThrown);
    //         }
    //     });
    // });

    // $("#EndMiP").click(function() {
    //     $.ajax({
    //         url: "endMissionPoll.php",
    //         method: "post",
    //         data: {},
    //         success: function(data) {
    //             console.log(data);
    //         },
    //         error: function(errorThrown) {
    //             console.warn(errorThrown);
    //         }
    //     });
    // });

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

    // $("#upgradeBtn").click(function() {
    //     $.ajax({
    //         url: "rootUpdate.php",
    //         method: "post",
    //         data: {

    //         },
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

    

    update();
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
            updatePlayers(data.players);
            updateMissions(data.missions, data.missionTeam);
        },
        error: (e) => {
            updatePlayers(debugPlayers)
        }
    });
}