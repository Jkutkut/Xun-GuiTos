window.onload = function() {
}

function openPopUp(type) {
    console.log($("#resistenciaPopUp").css("display"));
    
    
    let id = "#chunguitosPopUp"; // Show chunguitos'
    if (type == 0) {
       id = "#resistenciaPopUp"; // Show resistencia
    }
    $(".popUp").css("display", "none"); // Hide all popUps
    $(id).css("display", "block");

    $(".popUpFrame").css("display", "flex");

}
function closePopUp() {
    $(".popUpFrame").css("display", "none");
}