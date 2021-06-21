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
    // let size = $("body").css("width");
    let size = $("body").css("height");
    size = Number.parseInt(size.substr(0, size.length - 2) / 50);
    console.log(size);

    let arr = [
        ["huge", 5],
        ["bigger", 3],
        ["big", 2.5],
        ["normal", 2],
        ["small", 1.5],
        ["detail", 1]
    ]
    for (let a of arr) {
        $(":root").css("--" + a[0], a[1] * size);

    }
}