var canvas = $("#canvas"), context = canvas.get(0).getContext("2d");
var cropper, img;
$('#fileInput').on( 'change', function(){
    if (this.files && this.files[0]) { // if file selected
        if ( this.files[0].type.match(/^image\//) ) { //if file is an image
            canvas.css("display", "inline");
            $('#resultImg').css("display", "none");
            var reader = new FileReader();
            reader.onload = function(evt) {
                img = new Image();
                img.onload = function() {
                    let dW = window.innerWidth * 0.9; //Max width of the canvas
                    let dH = window.innerHeight * 0.5; //Max height of the canvas
                    let w = img.width;
                    let h = img.height;
                    
                    if (w > h) { //if horizontal photo -> reduce height
                        //dW = Use all the width - some padding
                        // dH *= w / h; //adjust the height to fit the photo
                        dH *= h / w; //adjust the width to fit the photo
                        console.log("horizontal");
                    }
                    else { //if vertical photo -> reduce width
                        //dH = Use all the height - some padding
                        // dW *= h / w; //adjust the width to fit the photo
                        dW *= w / h; //adjust the width to fit the photo
                        console.log(dW);
                        console.log("vertical");
                    }
                    context.canvas.width = dW;
                    context.canvas.height = dH;
                    // canvas.width = dW;
                    // canvas.height = dH;
                    
                    // context.drawImage(img, 0, 0);
                    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, dW, dH);
                    cropper = canvas.cropper({
                        viewMode: 2,
                        aspectRatio: 1 / 1,
                        movable: false
                        // zoomable: false,
                        // minContainerHeight: 500,
                        // minContainerWidth: 500,
                        // minContainerHeight: dH,
                        // minContainerWidth: dW,
                        // minCanvasHeight: dH,
		                // minCanvasWidth: dW
                    });
                };
                img.src = evt.target.result;
            };
            reader.readAsDataURL(this.files[0]);
        }
        else {
            alert("Invalid file type! Please select an image file.");
        }
    }
    else {
      alert('No file(s) selected.');
    }
});

$('#btnCrop').click(function() {
    // Get a string base 64 data url
    var croppedImageDataURL = canvas.cropper('getCroppedCanvas').toDataURL("image/png"); 
    
    // $result.append( $('<img>').attr('src', croppedImageDataURL));
    $('#resultImg').attr('src', croppedImageDataURL);
    canvas.cropper("destroy");
    canvas.css("display", "none");
    $('#resultImg').css("display", "inline");
 });