window.onload = function(){
    $(".lds-ring").css("height", $(".lds-ring").css("width"));
    $("#secretBtn").click(function(){
        console.log("works");
    });

    getQuerry();
}