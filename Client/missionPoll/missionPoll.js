const SELECTIONTIME = 400; // Time needed to hold the selection to vote.

window.onload = function() {
    getQuerry(); //function from common.js

    // validMission
    $(".missionCard").on("mousedown touchstart", function(e) { // When missionCard pressed
        $(this).addClass("selected"); // Start selection animation
        setTimeout(() => {
            vote(this);
        }, SELECTIONTIME); // after the time, attempt to vote
    }).bind("mouseup mouseleave touchend", function() { // When touch ended
        $(this).removeClass("selected"); // Stop selection animation and return to normal state
    });
}

/**
 * Attempts to make a submission of the current mission. If the card is still selected, send the vote to the server.
 * @param {DOM Element} vDiv - missionCard selected.
 */
function vote(vDiv) {
    if (!$(vDiv).hasClass("selected")) { // If pressed div no longer selected
        return;
    }

    let v = 0; // Vote for success
    if ($(vDiv).hasClass("failureMission")) {
        v = 1; // Vote for failure
    }

    console.log(`*** ${((v == 1)? "Success" : "Failure")} ***`);
    $.ajax({
        url: "voteMission",
        method: "post",
        data: {
            name: queryString.username,
            pId: queryString.pId,
            vote: v
        },
        success: function(data) {
            console.log(data);
            go2page("waitingRoom.html");
        }
    });
}