window.onload = function(){
    getQuerry(); //function from common.js


    $(".lds-ring").css("height", $(".lds-ring").css("width"));
    $("#secretBtn").click(function(){
        console.log("works");
    });
}