var waitingMenu = true; // To hadle the switch between rootMenu and waitingMenu
var phrases;
var phrasesBuffer = [];



/**
 * Ajax petition to see if the user can stop waiting for the first time.
 */
var ready4meetup = {
    url: "canStopWaiting",
    method: 'get',
    data: {
        currentState: 0
    },
    success: function(data) {
        if (data != "f") {
            delete queryString.firstTime; // If it's fistTime, remove it. If not, do nothing.
            go2page(data);
        }
        else {
            console.log("not valid");
            return false;
        }
    }
}
var ready4newRound = {
    url: "canStopWaiting",
    method: 'get',
    data: {
        currentState: 2 //Mission
    },
    success: function(data) {
        if (data != "f") {
            go2page(data);
        }
        else {
            console.log("not valid");
            return false;
        }
    }
}

/**
 * (Executed periodically) This function updates the div tag with a random phrase from the avalible
 * (See processPhrases to see how the phrases have been obtained)
 */
function changePhrase(){
    if (phrasesBuffer.length == 0){
        phrasesBuffer = [...phrases]; // Refill with the phrases
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


window.onload = function(){
    jQuery.getJSON("phrases.json").then(processPhrases); // Get the phrases from the json file and process them with the function
    // processPhrases(jQuery.parseJSON('{"common": ["Luchando contra chunguitos","Practicando el baile de la resistencia","Analizando al resto de jugadores","Haciendo movidas no chungas","Creando nombres en clave para el equipo"],"firstTime": ["Esperando al resto de jugadores","Buscando aliados","Muchiflopeando los servidores","Sincronizando dispositivos","Validando datos","Preparando partida"],"newRound": ["Psicoanalizando al resto","Pensando quién puede ser chunguito","Dudando si el de al lado miente","Será bueno el de enfrente?","Duda de tí el de la derecha seguro","El de la izquierda puede ser chunguito"]}'));

    if (queryString['fistTime'] == "true") { // if first time on the waiting room
        asyncInterval(ready4meetup, "t", 5000);    
    }
    else {
        asyncInterval(ready4newRound, "t", 5000);    
        
    }
    
}