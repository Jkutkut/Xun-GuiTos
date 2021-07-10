// var canvas, context, imgHTML, cropper, imgF;

var state = false;
var creatingPlayer = false;

window.onload = function(){ //When page loaded, define vars
    // canvas = $("#canvas");
    // context = canvas.get(0).getContext("2d");
    // imgHTML = $("#resultImg");

    $("#submitBtn").click(function(){
        let name = $("#nameTb").val(); //Get the name entered in the input.
        if(name == ""){ //If no name entered
        // if(name == "" || imgHTML.css("display") == "none"){ //If data is not correct
            //DO SOMETHING
            console.log("data not correct");
        }
        else{ //If data is correct
            createPlayer(name);
        }
    });
}

/**
 * Attempts to create a player on the server. If a player with this name already exists, the player can't be created.
 * @see This function should only run on one instance.
 * @param {String} name - Name of the desired player 
 */
function createPlayer(name) {
    if (creatingPlayer) return; // If already creating player, stop

    creatingPlayer = true; // Now creating player

    /**
     * This ajax argument checks if no player has this name. If unique, the next expression is triggered.
     */
    let checkName = {
        url: "players",
        method: "get",
        success: (players) => {
            let found = false;
            for (let p of players) {
                if (p.name == name)  {
                    found = true;
                    break;
                }
            }

            if (!found) { // If there's no player with this name
                $.ajax(addName); // Create player
            }
            else {
                createPlayer = false; // No longer creating player
                console.warn("Player already created");
            }
        },
        error: (e) => {
            console.error("Error checking the player");
            console.error(e);
            createPlayer = false; // No longer creating player
        }
    }
    
    /**
     * Attempts to create the player with the name
     */
    let addName = {
        url: 'createPlayer.php',
        method: 'post',
        data: {
            "name": name //name: "Adrián"
        },
        success: function(data) { // If correct, the data should be the player's pId
            console.log(data); //show the msg
            if (isInt(data)){ //If name added correctly
                pId = data;
                // $.ajax(addImg(pId)); //Try to add the img
                go2page("waitingRoom.html", {firstTime: true, username: name, pId: pId});
            }
        },
        error: (e) => {
            console.error("Error creating the player");
            console.error(e);
            createPlayer = false; // No longer creating player
        }
    };

    let addImg = function(pId) {
        return {
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
                    go2page("waitingRoom.html", {firstTime: true});
                }
            }
        };
    }

    $.ajax(checkName); // Check the name and create the player if valid
}
/*
var loadFile = function(event) { //When img selected
    toggleMenu(); //Change to edit menu
    
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
    toggleMenu(); //Return to normal menu
}
function cancelCrop(){
    cropper.destroy(); //The cropper is destroyed
    toggleMenu(); //Return to normal menu
}

function toggleMenu() {
    let s = function(sta){ return (sta)? "grid" : "none";};
    $("#main").css("display", s(state));
    $("#photo").css("display", s(!state));
    state = !state;
}
*/