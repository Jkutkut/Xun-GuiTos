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


window.onload = function() {
    $(window).resize(resizeTextSize);
    resizeTextSize();
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