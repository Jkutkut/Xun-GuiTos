var waitingMenu = true; // To hadle the switch between rootMenu and waitingMenu
var phrases;
var phrasesIndex = [];


/**
 * (Executed periodically) This function updates the div tag with a random phrase from the avalible
 * (See processPhrases to see how the phrases have been obtained)
 */
function changePhrase(){
    if (phrasesIndex.length == 0){
        phrasesIndex = phrases; // Refill with the phrases
    }
    // At this point phrasesIndex has length != 1
    let randomIndex = Math.floor(Math.random() * phrasesIndex.length); //Using phrasesIndex to avoid repeat the same phrase
    let p = phrasesIndex.splice(randomIndex, 1);
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
    let mainPlayer = $("#mainPlayer"); //The div element with the info of the host of the device

    mainPlayer.css("height", "100%");
    mainPlayer.css("width", "100%");


    let h = mainPlayer.css("height"); //get current height of mainplayer div
    h = parseFloat(h.substring(0, h.length - 2));
    $('#mainPlayerIcon').attr("src", "../../Res/img/default_user.png");
    $('#mainPlayerIcon').css("height", (h * 0.8) + "px"); //adjust the size of the icon to fit the div
    mainPlayer.css("height", h + "px"); //Also lock this height
    console.log("loaded")
}


window.onload = function(){
    
    getQuerry(); //function from common.js

    // jQuery.getJSON("phrases.json").then(processPhrases); // Get the phrases from the json file and process them with the function
    
    $(".lds-ring").css("height", $(".lds-ring").css("width")); // Change propertie of the loading animation
    
    $("#secretBtn_waitingM").click(toggleMenu);
    $("#secretBtn_rootM").click(toggleMenu);
}