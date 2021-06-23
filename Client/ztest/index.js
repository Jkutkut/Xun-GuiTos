
var mission = {
    mId: 1,
    active: false,
    leaderId: 3,
    vYes: 4,
    vNo: 1,
    mRes: 0
};

var myConfetti;
var myCanvas = document.getElementById("canvas");


window.onload = function() {
    $("body").css("background", "rgb(166, 23, 59)");
    
    partyTime();
    
}


/**
 * Launches 2 sets of confetti on a canvas named #conffeti
 * @param {number} type - Type of confetti (0: blue, 1: red)
 */
function partyTime(type=0) {
    $("#conffeti").css("display", "block");
    let colores;
    if (type == 0) { // Blue
        colores = ["#083987", "#6ea5ff", "#3874d6"];
    }
    else {
        colores = ["#e35d5d", "#ba3434", "#960606", "#d63c3c"];
    }
    let myConfetti = confetti.create(myCanvas, {
        resize: true,
        useWorker: true
    });

    let confetis = [
        {
            particleCount: 250,
            colors: colores,
            angle: 70,
            spread: 45,
            scalar: 4.5,
            gravity: 2,
            ticks: 300,
            decay: 0.8,
            drift: 1,
            origin: {
                x: 0,
                y: 1
            },
            startVelocity: 270
        },
        {
            particleCount: 250,
            colors: colores,
            angle: 110,
            spread: 45,
            scalar: 4.5,
            gravity: 2,
            ticks: 300,
            decay: 0.8,
            drift: -1,
            origin: {
                x: 1,
                y: 1
            },
            startVelocity: 270
        }
    ];

    for (let cofetti of confetis) {
        myConfetti(cofetti);
    }

    setTimeout(() => {
        $("#conffeti").css("display", "none");
    }, 5000)
}