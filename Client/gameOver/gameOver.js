var confettiCanvas;
window.onload = function() {
    $.ajax({
        url: "players",
        method: "get",
        success: (data) => {
            updateCards(data);
        },
        error: () => {
            selectResult("error");
        }
    })
    $("#confettiCanvas").attr("width", $("body").css("width"));
    $("#confettiCanvas").attr("height", $("body").css("height"));
    confettiCanvas = document.getElementById("confettiCanvas");

    selectResult(queryString.gameResult);
}

/**
 * Launches 2 sets of confetti on a canvas named #conffeti
 * @param {number} type - Type of confetti (0: blue, 1: red)
 */
 function partyTime(type=0) {
    $("#confetti").css("display", "block");
    let colores;
    if (type == 0) // Blue
        colores = ["#083987", "#6ea5ff", "#3874d6"];
    else
        colores = ["#e35d5d", "#ba3434", "#960606", "#d63c3c"];

    let myConfetti = confetti.create(confettiCanvas, {
        resize: true,
        useWorker: true
    });

    for (let i = 0; i < 2; i++) {
        myConfetti({
            particleCount: 250,
            colors: colores,
            angle: 70 + i * 40,
            spread: 45,
            scalar: 4.5,
            gravity: 2,
            ticks: 300,
            decay: 0.8,
            drift: Math.pow(-1, i),
            origin: {
                x: i,
                y: 1
            },
            startVelocity: 270
        });
    }

    setTimeout(() => {
        $("#confetti").css("display", "none");
    }, 5000);
}

/**
 * Show the desired end card.
 * @param {String} val - String with the desired result to show. If invalid one given, special end is shown.
 */
function selectResult(val) {
    switch(val) {
        case "0":
            $("#resistenciaWin").css("display", "block");
            $("body").css("background", "var(--blue)");
            partyTime(0);
            break;
        case "1":
            $("#resistenciaLoose").css("display", "block");
            $("body").css("background", "var(--red)");
            break;
        case "2":
            $("#chunguitoLoose").css("display", "block");
            $("body").css("background", "var(--blue)");
            break;
        case "3":
            $("#chunguitoWin").css("display", "block");
            $("body").css("background", "var(--red)");
            partyTime(1);
            break;
        default:
            $("#gameNotDone").css("display", "block");
            $("body").css("background", "var(--baseColor)");111
    }
}

/**
 * Given the players of the game, updates the cards with custom information.
 * @param {Array} players - Array of player-objects
 */
function updateCards(players) {
    $(".chunguitosP").css("text-transform", "none");

    $(".userNameP").text(queryString.username);

    let chunguitos = [];
    for (let p of players) { // GetChunguitos
        if (p.pType == 1){
            chunguitos.push(p.name);
        }
    }

    let i = 1, chunText = "" + chunguitos[0];
    for (; i < chunguitos.length - 1; i++) {
        chunText += ", " + chunguitos[i];
    }
    chunText += " y " + chunguitos[i];

    $(".chunguitosP").text(chunText);
}