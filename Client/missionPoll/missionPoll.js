var increment = 0, timeout = 0;
var VOTE = {
    SUCCESS: 0,
    FAILURE: 1
};

// debug
// const debugPlayers = [
//     {"pId":1,"name":"jorge","groupPos":null,"pType":1},
//     {"pId":2,"name":"paula","groupPos":null,"pType":0},
//     {"pId":3,"name":"ana","groupPos":null,"pType":1},
//     {"pId":4,"name":"adri","groupPos":null,"pType":0},
//     {"pId":5,"name":"laura","groupPos":null,"pType":1},
//     {"pId":6,"name":"user23","groupPos":null,"pType":0},
//     {"pId":7,"name":"fklsdj","groupPos":null,"pType":0}
// ];

window.onload = function() {
    getQuerry(); //function from common.js

    // validMission
    $(".missionCard").on("mousedwon touchstart", function(e) {
        $(this).addClass("selected");
        setTimeout(() => {
            vote(this);
        }, 400);
        console.log("touchStart");
    }).bind("mouseup mouseleave touchend", function() {
        $(this).removeClass("selected");
        console.log("released");
    });
}

function voteSuccess() {
    vote(VOTE.SUCCESS);
}

function voteFailure() {
    vote(VOTE.FAILURE);
}

function vote(v) {
    if (!$(v).hasClass("selected")) { // If pressed div isn't still selected
        return
    }

    console.log(v);
}