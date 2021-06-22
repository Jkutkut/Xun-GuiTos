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

