var phrasesIndex = [];
const phrases = [
    "Esperando al resto de jugadores",
    "phrase 1",
    "phrase 2",
    "phrase 3",
    "phrase 4",
    "phrase 5",
    "phrase 6",
    "phrase 7",
    "phrase 8"
];

function changePhrase(){
    if (phrasesIndex.length == 0){
        for(let i = 0; i < phrases.length; i++){
            phrasesIndex.push(i);
        }
    }
    // At this point phrasesIndex has length != 1
    let randomIndex = Math.floor(Math.random() * phrasesIndex.length); //Using phrasesIndex to avoid repeat the same phrase
    let index = phrasesIndex[randomIndex];
    console.log(index + " -> " + phrases[index]);
    phrasesIndex.splice(randomIndex, 1);

    $("#waitingLabel").text(phrases[index]);
}

window.onload = function(){
    
    getQuerry(); //function from common.js


    $(".lds-ring").css("height", $(".lds-ring").css("width"));
    $("#secretBtn").click(function(){
        console.log("works");
    });
}