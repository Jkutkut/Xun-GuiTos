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

function movingElement(e) {
    let touchLocation = e.targetTouches[0]; // grab the location of touch
    let eP = { // properties of the element to move
        x: touchLocation.pageX - rootMenu.playerP.w / 2,
        y: touchLocation.pageY - rootMenu.playerP.h / 2,
        w: rootMenu.playerP.w,
        h: rootMenu.playerP.h
    };
    // if e inside the container
    if (stillIn(eP, div2disposition(rootMenu.playerP.container), false)){
        e.target.style.left = eP.x + 'px';
        e.target.style.top = eP.y + 'px';
    }
}

function landElement(e) {
    // current box position.
    let eP = div2disposition($(e.target));
    let pP = div2disposition($(rootMenu.playerP.container));

    let coord = {
        x: parseInt(eP.x / eP.w),
        y: parseInt(eP.y / eP.h)
    };
    e.target.style.left = (coord.x * eP.w + pP.x) + "px";
    e.target.style.top = (coord.y * eP.h + pP.x)+ "px";
}


/* New code */

/* PlayerList */
/**
 * Changes the index of the leader and adds the icon to the desired player.
 * @param {number} leaderIndex index (1 based) of the player.
 */
function updateLeader(leaderIndex){
    rootMenu.leader.index = leaderIndex;
    rootMenu.leader.icon.remove(); // Remove the current icon
    $("#P" + leaderIndex).append(rootMenu.leader.icon);
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
    // let playerListLabel = $("#playersList_divContainer").children()[0];
    let h = pixel2float($("#playersList_divContainer").css("height")) / 10; // size of a player on the list
    
    //User
    let userTag = $("<i class=\"username\" style=\"width: 60%;\">Username</i>");
    
    //Icon
    rootMenu.leader.icon = $("<div id=\"rootMenu_leaderIcon\"></div>");
    rootMenu.leader.icon.css("height", (h * 0.98) + "px");
    rootMenu.leader.icon.css("width", (h * 0.98) + "px");

    
    for (let i = 1; i <= 10; i++){
        let otherPlayer = $("<div id=\"P"+ i + "\" class=\"\" style=\"background = blue; width: 100%; height: 10%;\"></div>");
        let tag = $("<i id=\"P" + i + "_name\" class=\"username\" style=\"width: 60%;\">P" + i + "_name</i>");
        otherPlayer.append(tag);
        rootMenu.playerL.append(otherPlayer);
    }
    updateLeader(2);
    
    // $("#secretBtn_waitingM").click(toggleMenu);
    // $("#secretBtn_rootM").click(toggleMenu);
}

$(function(){
	$('#playersList').gridstrap({
		/* default options */
	});
});