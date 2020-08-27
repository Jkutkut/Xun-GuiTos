var canvas, context, imgHTML, cropper, imgF;

window.onload = function(){
    canvas = $("#canvas");
    context = canvas.get(0).getContext("2d");
    imgHTML = $("#resultImg");
}

var loadFile = function(event) {
    canvas.css("display", "inline");
    imgHTML.css("display", "none");
    
    imgF = new Image();
    imgF.onload = function(event) {
        let dW = window.innerWidth * 0.9; //Max width of the canvas
        let dH = window.innerHeight * 0.5; //Max height of the canvas
        let w = imgF.width;
        let h = imgF.height;
        
        if (w > h) { //if horizontal photo -> reduce height
            //dW = Use all the width - some padding
            dH *= h / w; //adjust the width to fit the photo
            console.log("horizontal");
        }
        else { //if vertical photo -> reduce width
            //dH = Use all the height - some padding
            dW *= w / h; //adjust the width to fit the photo
            console.log("vertical");
        }
        context.canvas.width = dW;
        context.canvas.height = dH;
        canvas.css({width: dW + "px",height: dH + "px"});
                                
        context.drawImage(imgF, 0, 0, imgF.width, imgF.height, 0, 0, dW, dH);
        cropper = new Cropper(document.getElementById("canvas"), {
            viewMode: 2,
            aspectRatio: 1 / 1
        });
    }
    imgF.src = URL.createObjectURL(event.target.files[0]);
};
function cropImg(){
    // Get a string base 64 data url
    var croppedImageDataURL = cropper.getCroppedCanvas().toDataURL("image/png");
    imgHTML.attr('src', croppedImageDataURL);
    cropper.destroy();
    canvas.css("display", "none");
    imgHTML.css("display", "inline");
}
