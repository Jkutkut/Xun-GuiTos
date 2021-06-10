var phrases;
var phrasesBuffer = [];
var rootMenu = {
    playerL: null,
    playerP: {},
    leader: {
        index: null,
        icon: null
    },
    players: [],
    missions: []
};


/* PlayerList */

function updatePlayers(players) {
    rootMenu.players = players;
    for (let p of players) {
        renamePlayer(p.pId, p.name);
        console.log(p);
    }
}

/**
 * Changes the index of the leader and adds the icon to the desired player.
 * @param {number} leaderIndex index (1 based) of the player.
 */
function updateLeader(leaderIndex){
    rootMenu.leader.index = leaderIndex;
    $("#rootMenu_leaderIcon").appendTo("#P" + leaderIndex);
    console.log("Changed to P" + leaderIndex);
}


/**
 * Renames the selected player on the playerList.
 * @param {number} index - index (1 based) of the desired player
 * @param {string} name - name to change the player to.
 */
function renamePlayer(index, name){
    $("#P" + index + "_name").text(name);
}


function getPlayersOrder() {
    let newOrder = [];
    for (let p of rootMenu.players) {
        // newOrder.push({pId: p.pId, groupPos: }); // USE ME
        newOrder.push({pId: p.pId, groupPos: p.pId}); // temporal code
    }
}


/* MISSIONS */

function updateMissions(missionOBJ) {


    rootMenu.missionOBJ = missionOBJ;
    let missions = missionOBJ.missions;

    console.log(missions);
    let missionsEnded = true;
    for (let m of missions) {
        console.log(m);
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
            let leaderName;
            for (let p of rootMenu.players) {
                if (p.pId == m.leaderId) {
                    leaderName = p.name;
                    break;
                }
            }
            $("#M" + m.mId + "leader").text("Leader: " + leaderName);
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
        for (let p of missionOBJ.missionTeam) { // For each 
            if (p.mId == m.mId) { // If player went to the current mission
                playersId.add(p.pId); // Add the id
            }
        }
        for (let p of rootMenu.players) {
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
    
    getQuerry(); //function from common.js

    rootMenu.playerL = $("#playersList");
    let h = pixel2float($("#playersList_divContainer").css("height")) / 10; // size of a player on the list
    
    //Icon
    rootMenu.leader.icon = "<div id=\"rootMenu_leaderIcon\" style=\"height:" + (h * 0.8) + "px; width:" + (h * 0.8) + "px; display: block; margin-left: auto; transform: translateY(9%);\"></div>";

    
    for (let i = 1; i <= 10; i++){
        let otherPlayer = $("<div id=\"P"+ i + "\" class=\"\" style=\"width: 100%; height: 10%;\"></div>");
        let tag = $("<i id=\"P" + i + "_name\" class=\"username\" style=\"width: 50%; transform: translateY(50%);\">------</i>");
        otherPlayer.append(tag);
        rootMenu.playerL.append(otherPlayer);

        otherPlayer.css("background", "yellow");
        tag.css("float", "left");

        $("#P" + i).on("tap", function(){console.log("fdhakjf")});
        // $("#P" + i).click(function(){console.log("fdhakjf")});
        // $("#P" + i).click(eval("()=>{updateLeader(" + i + ");}"));
        // otherPlayer.on('tap', eval("() =>{updateLeader(" + i + ");}"));
        // $(document).on('vclick', '#P' + i, eval("() =>{updateLeader(" + i + ");}"));
        // $(document).on('vclick', '#P' + i, eval("() =>{console.log('hfald')}"));
        
    }
    $("#P1").append(rootMenu.leader.icon);
    
    // $("#secretBtn_waitingM").click(toggleMenu);
    // $("#secretBtn_rootM").click(toggleMenu);


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

    update();
}

$(function(){
	$('#playersList').gridstrap({
		/* default options */
	});
});


function update() {
    $.ajax({
        url: "players",
        method: "get",
        success: function(data) {
            updatePlayers(data);
        }
    });

    $.ajax({
        url: "missions",
        method: "get",
        success: function(data) {
            updateMissions(data);
        }
    });
}