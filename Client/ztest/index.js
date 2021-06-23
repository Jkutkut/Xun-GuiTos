window.onload = function() {
}
var mission = {
    mId: 1,
    active: false,
    leaderId: 3,
    vYes: 4,
    vNo: 1,
    mRes: 0
};


function openPopUp(mission) {
    console.log($("#resistenciaPopUp").css("display"));
    
    // Select correct popUp
    let id = "#chunguitosPopUp"; // Show chunguitos'
    if (mission.mRes == 0) {
       id = "#resistenciaPopUp"; // Show resistencia
    }
    $(".popUp").css("display", "none"); // Hide all popUps
    $(id).css("display", "block"); // Show the important one

    // Update popUp's score
    $(".smallLabel").text(
        "Éxito: " + mission.vYes +
        " -- Fracaso: " + mission.vNo
    );
    
    $(".popUpFrame").css("display", "flex"); // Show the frame with the popUps
}
function closePopUp() {
    $(".popUpFrame").css("display", "none");
}