var phrasesIndex = [];
const phrases = [
    "Buscando aliados",
    "Luchando contra chunguitos",
    "Practicando el baile de la resistencia",
    "Muchiflopeando los servidores",
    "Haciendo movidas chungas",
    ""
];

function changePhrase(){
    if (phrasesIndex.length == 0){
        for(let i = 0; i < phrases.length; i++){
            phrasesIndex.push(i);
        }
    }
    // At this point phrasesIndex has length != 1
    let randomIndex = Math.floor(Math.random() * phrasesIndex.length); //Using phrasesIndex to avoid repeat the same phrase
    phrasesIndex.splice(randomIndex, 1);
    $("#waitingLabel").text(phrases[phrasesIndex[randomIndex]]);
}

window.onload = function(){
    
    getQuerry(); //function from common.js
    
    let phr;
    if(queryString['fistTime'] == "true"){
        phr = [
            "Esperando al resto de jugadores",
            "Analizando al resto de jugadores",
            "Sincronizando dispositivos",
            "Validando datos",
            ""
        ];
        
        $("#waitingLabel").text("Esperando al resto de jugadores");
    }
    else {
        phr = [
            "Pensando quién puede ser chunguito",
            "Dudando si el de al lado miente",
            "Será bueno el de enfrente?",
            "Duda de tí el de la derecha seguro",
            "El de la izquierda puede ser chunguito",
            ""
        ];
        
    }
    for (let i = 0; i < phr.length; i++) { //for all new phrases
        phrases.push(phr[i]); //Add them to the phases array
    }
    $("#waitingLabel").text(phr[0]); //Set the first string from the phr array as the text now
    setInterval(changePhrase, 5000); //Change the phrase periodically



    $(".lds-ring").css("height", $(".lds-ring").css("width"));
    $("#secretBtn").click(function(){
        console.log("works");
    });
}