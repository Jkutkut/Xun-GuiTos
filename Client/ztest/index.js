$(function(){
	$('#grid').gridstrap({
		/* default options */
	});
});

function getOrden() {
    let children = $("#grid").children();
    for (let i = 0; i < children.length -1; i++) {
        console.log(children[i].innerHTML);
    }
}