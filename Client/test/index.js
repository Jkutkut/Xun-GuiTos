var canvas = $("#canvas"), context = canvas.get(0).getContext("2d"), $result = $('#result');
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
                    // let w = 1024;
                    // let h = 1024 * img.height / img.width;
                    // // context.canvas.height = h;
                    // // context.canvas.height = img.height;
                    // // context.canvas.width = w;
                    // // context.canvas.width  = img.width;
                    // context.drawImage(img, 0, 0, w, w * h);

                    var imgWidth = img.width;
                    var screenWidth = 1024;
                    var scaleX = 1;
                    if (imgWidth > screenWidth)
                        scaleX = screenWidth/imgWidth;
                    var imgHeight = img.height;
                    var screenHeight = 1024;
                    var scaleY = 1;
                    if (imgHeight > screenHeight)
                        scaleY = screenHeight/imgHeight;
                    var scale = scaleY;
                    if(scaleX < scaleY)
                        scale = scaleX;
                    if(scale < 1){
                        imgHeight = imgHeight*scale;
                        imgWidth = imgWidth*scale;          
                    }
                  
                    canvas.height = imgHeight;
                    canvas.width = imgWidth;

                    context.drawImage(img, 0, 0, img.width, img.height, 0,0, imgWidth, imgHeight);

                    cropper = canvas.cropper({
                        aspectRatio: 1 / 1
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