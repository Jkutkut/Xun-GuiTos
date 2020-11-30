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
}


window.onload = function(){
    
    getQuerry(); //function from common.js

    // jQuery.getJSON("phrases.json").then(processPhrases); // Get the phrases from the json file and process them with the function
    
    $(".lds-ring").css("height", $(".lds-ring").css("width")); // Change propertie of the loading animation
    
    $("#secretBtn_waitingM").click(toggleMenu);
    $("#secretBtn_rootM").click(toggleMenu);
}