var playersContainer, mainPlayer;
window.onload = function() {
    playersContainer = $("#playersContainer");
    mainPlayer = $("#mainPlayer");

    let h = mainPlayer.css("height");
    h = parseFloat(h.substring(0, h.length - 2));
    $('#mainPlayerIcon').attr("src", "../../Res/img/default_user.png");
    $('#mainPlayerIcon').css("height", (h * 0.75) + "px");
    mainPlayer.css("height", h + "px");

    for(let i = 1; i < 5; i++) {
        let row = jQuery('<div class="horizontalCols" style="--h: 100%;--c: 3; grid-row: ' + i + '"></div>')
        for(let j = 1; j <= 3; j += 2){
            let p = mainPlayer.clone();
            p.attr("id", i + "" + j);
            p.css("--pos", j);
            row.append(p);
        }
        row.appendTo(playersContainer);
    }
    $("#11").click(function() {
        console.log($("#11").css("background"));
        $("#11").css("background", "red");
    });
}