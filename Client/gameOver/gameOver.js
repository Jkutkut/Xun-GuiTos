var confettiCanvas;
window.onload = function() {
    getQuerry(); //function from common.js

    $("#confetti").css("display", "none");
    $("#confettiCanvas").attr("width", $("body").css("width"));
    $("#confettiCanvas").attr("height", $("body").css("height"));
    confettiCanvas = document.getElementById("confettiCanvas");

    selectResult(0);
}

/**
 * Launches 2 sets of confetti on a canvas named #conffeti
 * @param {number} type - Type of confetti (0: blue, 1: red)
 */
 function partyTime(type=0) {
    $("#confetti").css("display", "block");
    let colores;
    if (type == 0) { // Blue
        colores = ["#083987", "#6ea5ff", "#3874d6"];
    }
    else {
        colores = ["#e35d5d", "#ba3434", "#960606", "#d63c3c"];
    }
    let myConfetti = confetti.create(confettiCanvas, {
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
        $("#confetti").css("display", "none");
    }, 5000)
}

function selectResult(val) {
    switch(val) {
        case 0:
            $("#resistenciaWin").css("display", "block");
            $("body").css("background", "var(--blue)");
            partyTime(0);
            break;
        case 1:
            $("#resistenciaLoose").css("display", "block");
            $("body").css("background", "var(--red)");
            break;
        case 2:
            $("#chunguitoWin").css("display", "block");
            $("body").css("background", "var(--red)");
            partyTime(1);
            break;
        case 3:
            $("#chunguitoLoose").css("display", "block");
            $("body").css("background", "var(--blue)");
            break;
    }
}