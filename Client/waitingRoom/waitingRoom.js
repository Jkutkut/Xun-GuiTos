var waitingMenu = true; // To hadle the switch between rootMenu and waitingMenu
var phrases;
var phrasesBuffer = [];
var rootMenu = {
    playerP: {}
};


/**
 * (Executed periodically) This function updates the div tag with a random phrase from the avalible
 * (See processPhrases to see how the phrases have been obtained)
 */
function changePhrase(){
    if (phrasesBuffer.length == 0){
        phrasesBuffer = phrases; // Refill with the phrases
    }
    // At this point phrasesBuffer has length != 1
    let randomIndex = Math.floor(Math.random() * phrasesBuffer.length); //Using phrasesBuffer to avoid repeat the same phrase
    let p = phrasesBuffer.splice(randomIndex, 1);
    $("#waitingLabel").text(p);
}

/**
 * Updates the variable "phrases" with the phases from the input.
 * @param {object} data - JSON-like object with the phrases divided in 3 categories: common, firstTime and newRound
 */
function processPhrases(data) {
    phrases = data.common; // Add the common phrases
    
    let phr; // Extra phrases to add to "phrases"
    if (queryString['fistTime'] == "true") { // if first time on the waiting room
        phr = data.firstTime;
    }
    else {
        phr = data.newRound;
    }

    phrases = phrases.concat(phr); // Add the extra phrases
    $("#waitingLabel").text(phr[0]); //Set the first string from the phr array as the text now
    setInterval(changePhrase, 5000); //Change the phrase periodically
}

/**
 * Using the variable "waitingMenu", this code toggles the view of both menus
 */
function toggleMenu() {
    let hideDiv, showDiv;
    if (waitingMenu) { // If on the waiting menu
        showDiv = "#rootMenu";
        hideDiv = "#waitingMenu";
    }
    else {
        showDiv = "#waitingMenu";
        hideDiv = "#rootMenu";
    }
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

    jQuery.getJSON("phrases.json").then(processPhrases); // Get the phrases from the json file and process them with the function
    
    $(".lds-ring").css("height", $(".lds-ring").css("width")); // Change propertie of the loading animation
    
    $("#secretBtn_waitingM").click(toggleMenu);
    $("#secretBtn_rootM").click(toggleMenu);
}