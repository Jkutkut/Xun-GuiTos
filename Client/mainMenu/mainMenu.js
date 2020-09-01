var playersContainer, mainPlayer;
window.onload = function() {
    // let e = ["#M1", "#nPlayers1", "#score-specialM"];
    let e = ["M", "nPlayers"];
    let size = [0.2, 0.6, 0.15].map(x => x * 0.9);
    let s = $("#scoreM1").css("height");
    s = parseFloat(s.substring(0, s.length - 2));

    for (let i = 0; i < e.length; i++){
        console.log(s);
        console.log((s * size[i]) + "px");
        $("#" + e[i] + 1).css("font-size", (s * size[i]) + "px");
    }
    $("#nPlayers1").css("width", $("#nPlayers1").css("height"));
    $("#nPlayers1").css("border-radius", s);

    let score = $("#scoreM1");
    for(let i = 2; i <= 5; i++){
        let newS = score.clone();
        newS.attr("id", "scoreM" + i);
        let children = newS.children();
        for(let j = 0; j < children.length; j++){
            children[j].id = e[j] + i;
        }
        $("#scoreContainer").append(newS);
        $("#M" + i).text("Misión " + i);
    }
    $("#scoreM4").append(jQuery('<i id="score-specialM">2 fallos</i>'));
    $("#score-specialM").css("font-size", (s * size[2]) + "px");



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
            if(i == 1 && j == 1){
                let p = mainPlayer.clone();
                p.attr("id", "12");
                p.css("--pos", 2);
                row.append(p);
            }
        }
        row.appendTo(playersContainer);
    }

    $("#11").click(function() {
        console.log($("#11").css("background"));
        $("#11").css("background", "red");
    });
}