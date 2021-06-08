const TIME2SEE = 5000;

window.onload = function() {

    getQuerry(); //function from common.js

    $("#submitBtn").click(function() {
        $("#main").css("display", "none");
        $("#characterReveal").css("display", "grid");
    });
}
