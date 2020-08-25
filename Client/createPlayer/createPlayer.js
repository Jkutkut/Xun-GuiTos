// import Cropper from 'cropperjs';
var cropper, crop, image;
var a, b;

var loadFile = function(event) {
    image = document.getElementById('icon');
    image.src = URL.createObjectURL(event.target.files[0]);
    image.style.width = "1024px";


    var img = new Image();
    img.onload = function() {
        context.canvas.height = img.height;
        context.canvas.width  = img.width;
        context.drawImage(img, 0, 0);
        var cropper = canvas.cropper({
            aspectRatio: 1 / 1
        });
    };
    img.src = evt.target.result;
};
function cropImg(){
    try {
        console.log("start");
        crop.cropper.destroy = function destroy() {
            var element = this.element;
      
            if (!element[NAMESPACE]) {
              return this;
            }
      
            element[NAMESPACE] = undefined;
      
            // if (this.isImg && this.replaced) {
            //   element.src = this.originalUrl;
            // }
      
            this.uncreate();
            return this;
          };
        // crop.cropper.destroy();
        let newImg = crop.cropper.getCroppedCanvas()//.toDataURL("image/png");
        // document.getElementById("icon2").src= crop.cropper.getCroppedCanvas().toDataURL("image/png"); 
        // cropper = null;
        // crop = null;
        // document.getElementById("icon2").style.width = "1024px";
    } catch (error) {
        alert(error);
    }
    console.log("end");


    // console.log("proper: (" + image.width + ", " + image.height + ")");
}
