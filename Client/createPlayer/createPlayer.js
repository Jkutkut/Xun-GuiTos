var canvas, context, imgHTML, cropper, imgF;

var state = false;
var pId;

window.onload = function(){ //When page loaded, define vars
    canvas = $("#canvas");
    context = canvas.get(0).getContext("2d");
    imgHTML = $("#resultImg");

    $("#submitBtn").click(function(){
        let name = $("#nameTb").val(); //Get the name entered in the input.
        if(name == "" || imgHTML.css("display") == "none"){ //If data is not correct
            //DO SOMETHING
            console.log("data not correct");
        }
        else{ //If data is correct
            //add name, img to DB
            let addName = {
                url: 'createPlayer.php',
                method: 'post',
                data: {
                    "name": name //name: "Adrián"
                },
                success: function(data) {
                    if (typeof data == "number"){ //If name added correctly
                        pId = data;
                        $.ajax(addImg); //Try to add the img
                    }
                    console.log(data); //show the msg
                }
            };
            let addImg = {
                url: 'addImg.php',
                method: 'post',
                data: {
                    "pId": pId,
                    "user": name,
                    "img": getBase64Image(document.getElementById("resultImg"))
                },
                success: function(data) {
                    console.log(data);
                    if(data == "Img stored and linked"){ // if img stored correctly:
                        //Go to the waiting room with the user's name and being the firstTime
                        window.location.href = "waitingRoom.html?pId=" + pId + "&username=" + name + "&fistTime=true";
                    }
                }
            };

            $.ajax(addName); //First add name
        }
    });
}

var loadFile = function(event) { //When img selected
    togleMenu(); //Change to edit menuñ
    
    imgF = new Image(); //Here the new img File will be stored
    imgF.onload = function(event) { //When img loaded, display it the best way possible
        let dW = window.innerWidth * 0.9; //Max width of the canvas
        let dH = window.innerHeight * 0.5; //Max height of the canvas
        let w = imgF.width;
        let h = imgF.height;
        
        if (w > h) { //if horizontal photo -> change height
            //dW = Use all the width - some padding
            dH *= h / w; //adjust the width to fit the photo
        }
        else { //if vertical photo -> change width
            //dH = Use all the height - some padding
            dW *= w / h; //adjust the width to fit the photo
        }
        context.canvas.width = dW; //change scale of canvas (width)
        context.canvas.height = dH; //change scale of canvas (height)
        canvas.css({width: dW + "px",height: dH + "px"}); //change the width of the canvas
                                
        context.drawImage(imgF, 0, 0, imgF.width, imgF.height, 0, 0, dW, dH); //Draw img on canvas
        cropper = new Cropper(document.getElementById("canvas"), { //create the cropper
            viewMode: 2,
            aspectRatio: 1 / 1
        });
    }
    imgF.src = URL.createObjectURL(event.target.files[0]); //Add the img selected as the img file
};

function cropImg(){ //When cropped btn selected, this code is executed
    // Get a string base 64 data url
    let croppedImageDataURL = cropper.getCroppedCanvas().toDataURL("image/png");
    imgHTML.attr('src', croppedImageDataURL); //add the cropped img to the img tag 
    cropper.destroy(); //The cropper is destroyed

    imgHTML.css("display", "inline");
    togleMenu(); //Return to normal menu
}
function cancelCrop(){
    cropper.destroy(); //The cropper is destroyed
    togleMenu(); //Return to normal menu
}

function togleMenu() {
    let s = function(sta){ return (sta)? "grid" : "none";};
    $("#main").css("display", s(state));
    $("#photo").css("display", s(!state));
    state = !state;
}