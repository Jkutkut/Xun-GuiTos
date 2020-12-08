var waitingMenu = true; // To hadle the switch between rootMenu and waitingMenu
var phrases;
var phrasesBuffer = [];
var rootMenu = {
    playerP: {}
};


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


window.onload = function(){
    
    getQuerry(); //function from common.js

    let h = pixel2float($("#rootMenu_leaderIcon").css("height"));
    $("#rootMenu_leaderIcon").css("width", h + "px");
    let leaderIcon = $("#rootMenu_leaderIcon");

    let playerL = $("#playersList");
    let player = $("#P1");
    for (let i = 2; i <= 10; i++){
        let otherPlayer = player.clone();
        otherPlayer.attr("id", "P" + i);
        playerL.append(otherPlayer);

    }
    
    
    // $("#secretBtn_waitingM").click(toggleMenu);
    // $("#secretBtn_rootM").click(toggleMenu);
}