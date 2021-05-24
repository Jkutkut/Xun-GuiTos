var waitingMenu = true; // To hadle the switch between rootMenu and waitingMenu
var phrases;
var phrasesBuffer = [];
var rootMenu = {
    playerL: null,
    playerP: {},
    leader: {
        index: null,
        icon: null
    }
};


/* Old code */
/**
 * Using the variable "waitingMenu", this code toggles the view of both menus
 * @param {string} btnID - ID of the button used.
 */
function toggleMenu(btnID) {
    let hideDiv, showDiv;
    let menuMap = {
        "alignPlayers_btn": {
            hideDiv: "alignPlayers_div",
            showDiv: ""
        }
    };
    hideDiv = menuMap[btnID].hideDiv;
    showDiv = menuMap[btnID].showDiv;

    $(showDiv).css("display", "grid");
    // $(showDiv).css("display", $(hideDiv).css("display"));
    $(hideDiv).css("display", "none");
    
    console.log(hideDiv + " -> " + showDiv);
    waitingMenu = ! waitingMenu;
    if (!waitingMenu) {
        loadRootMenu();
    }
}

function loadRootMenu() {
    let playersContainer = $("#playersContainer"); //The div element with the rows where the player's divs + btns are stored
    rootMenu.playerP.container = playersContainer;
    let mainPlayer = $("#mainPlayer"); //The div element with the info of the host of the device

    rootMenu.playerP.w = pixel2float(playersContainer.css("width")) / 3; //get current height of mainplayer div
    rootMenu.playerP.h = pixel2float(playersContainer.css("height")) / 5; //get current height of mainplayer div

    
    $('#mainPlayerIcon').attr("src", "../../Res/img/default_user.png");
    $('#mainPlayerIcon').css("height", (rootMenu.playerP.h * 0.8) + "px"); //adjust the size of the icon to fit the div

    $(".username").css("font-size", rootMenu.playerP.h * 0.2);
    
    mainPlayer.css("width", rootMenu.playerP.w + "px"); //Also lock this width
    mainPlayer.css("height", rootMenu.playerP.h + "px"); //Also lock this height

    mainPlayer.css("position", "absolute");

    
    rootMenu.box = document.getElementById('mainPlayer');
    rootMenu.box.addEventListener('touchmove', movingElement);
    rootMenu.box.addEventListener('touchend', landElement);
}



/* New code */

/* PlayerList */
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
    console.log("P" + index + "_name");
    $("#P" + index + "_name").text(name);
}

window.onload = function(){
    
    getQuerry(); //function from common.js

    rootMenu.playerL = $("#playersList");
    let h = pixel2float($("#playersList_divContainer").css("height")) / 10; // size of a player on the list
    
    //Icon
    rootMenu.leader.icon = "<div id=\"rootMenu_leaderIcon\" style=\"height:" + (h * 0.8) + "px; width:" + (h * 0.8) + "px; display: block; margin-left: auto; transform: translateY(9%);\"></div>";

    
    for (let i = 1; i <= 10; i++){
        let otherPlayer = $("<div id=\"P"+ i + "\" class=\"\" style=\"width: 100%; height: 10%;\"></div>");
        let tag = $("<i id=\"P" + i + "_name\" class=\"username\" style=\"width: 50%; transform: translateY(50%);\">P" + i + "_name</i>");
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
}

$(function(){
	$('#playersList').gridstrap({
		/* default options */
	});
});