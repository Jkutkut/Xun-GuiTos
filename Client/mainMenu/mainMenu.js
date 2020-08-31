var playersContainer, mainPlayer;
window.onload = function() {
    // let score = $("#scoreContainer");
    // let w = score.css("height");
    // $("#scoreM1").css("height", w);
    
    
    playersContainer = $("#playersContainer"); //The div element with the rows where the player's divs + btns are stored
    mainPlayer = $("#mainPlayer"); //The div element with the info of the host of the device

    let h = mainPlayer.css("height"); //get current height of mainplayer div
    h = parseFloat(h.substring(0, h.length - 2));
    $('#mainPlayerIcon').attr("src", "../../Res/img/default_user.png");
    $('#mainPlayerIcon').css("height", (h * 0.75) + "px"); //adjust the size of the icon to fit the div
    mainPlayer.css("height", h + "px"); //Also lock this height

    for(let i = 1; i < 5; i++) { //Make the rest of the users
        //create a row
        let row = jQuery('<div class="horizontalCols" style="--h: 100%;--c: 3; grid-row: ' + i + '"></div>');
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