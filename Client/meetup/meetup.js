window.onload = function() {
    $("#submitBtn").click(function() { // When the button to reveal the player selected
        $("#main").css("display", "none");
        $("#characterReveal").css("display", "flex");
    });

    $(".toMainMenuBtn").click(function() { // When btn to go to MainMenu clicked
        go2page("mainMenu.html");
    });

    $.ajax({
        url: "players",
        method: "get",
        success: function(data) {
            getMyCharacter(data);
        }
    });
}

/**
 * Analices the players in the game, discovers which type of player is the user and loads the correct message.
 * @param {Obj} data - Data with all the players. The object must be an Array with the content of NodeRed Database.
 */
function getMyCharacter(data) {
    let chunguitos = [];
    let whatAmI = "resistencia";
    for (let player of data) { // for each player
        if (player.pType == 1) { // If the user is chunguito
            if (player.name == queryString.username) { // If the player represent the user
                whatAmI = "chunguito";
            }
            else { // If chunguito found and it is not me
                chunguitos.push(player.name);
            }
        }
    }
    console.log(`-> ${whatAmI}`);

    $(`#${whatAmI}`).css("display", "block");
    $(".userNameTag").text(queryString.username);

    // Update the message choosen with extra information.
    if (whatAmI == "chunguito") {
        let chunText = chunguitos[0];
        if (chunguitos.length > 1) {
            let i = 1;
            for (; i < chunguitos.length - 1; i++) {
                chunText += `, ${chunguitos[i]}`;
            }
            chunText += ` y ${chunguitos[i]}`;
        }
        // Add the partner(s) to the message
        $("#chunguitosP").text(chunText);
    }
    else {
        $("#nChunguitos").text(chunguitos.length); // Show the number of chunguitos
        $("#resistencia").css("font-size", "calc(var(--detailText) * 1.4)"); // Less text => bigger size
    }
}
