const SELECTIONTIME = 400; // Time needed to hold the selection to vote.

window.onload = function() {
    getQuerry(); //function from common.js

    // validMission
    $(".missionCard").on("mousedwon touchstart", function(e) { // When missionCard pressed
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

    let v = 1;
    if ($(vDiv).hasClass("failuremission")) {
        v = -1;
    }

    console.log("******* " + ((v == 1)? "Success" : "Failure") + " *******");
    // $.ajax({
    //     url: "",
    //     method: "post",
    //     data: {
    //         name: queryString.username,
    //         v: v
    //     },
    //     success: function(data) {
    //         console.log(data);

    //     }
    // });
}