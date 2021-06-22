// $(function(){
// 	$('#grid').gridstrap({
// 		/* default options */
// 	});
// });

// function getOrden() {
//     let children = $("#grid").children();
//     for (let i = 0; i < children.length -1; i++) {
//         console.log(children[i].innerHTML);
//     }
// }

var index = 0;
var times = 0;

window.onload = function() {
    $(window).resize(resizeTextSize);
    resizeTextSize();

    // setInterval(function(){
    //     const arr = [
    //         [0, 0],
    //         [1, 0],
    //         [0, 1],
    //         [2, 0],
    //         [0, 2],
    //         [3, 0],
    //         [0, 3]
    //     ]
    //     let f = function(x, j) {
    //         if (x == 0) {
    //             return j;
    //         }
    //         else {
    //             return x;
    //         }
    //     }
    //     changeBackground(f(arr[index][0], times), f(arr[index][1], times));
    //     index++;
    //     if (index >= arr.length) {
    //         index = 0;
    //         times = (times + 1);
    //     }
    // }, 2000);
    changeBackground(0, 0)
}

function resizeTextSize() {
    let size = $("body").css("height");
    size = Number.parseInt(size.substr(0, size.length - 2) / 50);
    console.log(size);

    let textSize = [
        ["huge", 3.5],
        ["bigger", 3],
        ["big", 2.5],
        ["normal", 2],
        ["small", 1.5],
        ["detail", 1]
    ]
    for (let e of textSize) {
        $(":root").css("--" + e[0], e[1] * size + "px");

    }
}

/**
 * Updates the background acording to the current score of missions
 * @param {number} resistencia - Missions won by the resistance
 * @param {number} chunguitos - Missions won by the chunguitos
 */
function changeBackground(resistencia, chunguitos) {
    if (resistencia >= 3) {
        $("body").css("background", "var(--blue)");
    }
    else if (chunguitos >= 3) {
        $("body").css("background", "var(--red)");
    }
    else { // Normal
        const intensidad = {
            resistencia: [
                5,
                15,
                30
            ],
            chunguitos: [
                90,
                70,
                55
            ]
        }
        // console.log("linear-gradient(180deg, var(--blue) " + intensidad.resistencia[resistencia] + "%, var(--red) " + intensidad.chunguitos[chunguitos] + "%)");
        console.log("("+resistencia+", "+chunguitos+")");
        $("body").css("background", "linear-gradient(180deg, var(--blue) " + intensidad.resistencia[resistencia] + "%, var(--red) " + intensidad.chunguitos[chunguitos] + "%)");
    }
}