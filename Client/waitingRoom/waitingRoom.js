var phrasesIndex = [];
var phrases;

function changePhrase(){
    if (phrasesIndex.length == 0){
        phrasesIndex = phrases;
    }
    // At this point phrasesIndex has length != 1
    let randomIndex = Math.floor(Math.random() * phrasesIndex.length); //Using phrasesIndex to avoid repeat the same phrase
    let p = phrasesIndex.splice(randomIndex, 1);
    $("#waitingLabel").text(p);
}

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

window.onload = function(){
    
    getQuerry(); //function from common.js

    jQuery.getJSON("phrases.json").then(processPhrases);
    
    $(".lds-ring").css("height", $(".lds-ring").css("width"));
    
    $("#secretBtn").click(function(){
        console.log("works");
    });
}