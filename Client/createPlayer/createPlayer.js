// import Cropper from 'cropperjs';
var cropper, crop, image;
var a, b;

var loadFile = function(event) {
    image = document.getElementById('icon');
    // console.log("proper: (" + image.width + ", " + image.height + ")");
    image.src = URL.createObjectURL(event.target.files[0]);
    image.style.width = "1024px";
    cropper = new Cropper(image, {
        aspectRatio: 1 / 1,
        movable: false,
        rotatable: false,
        minCropBoxWidth: 500,
        // crop(event) {
        //     console.log(event.detail.width);
        // },
        viewMode: 2,
        ready(event) {
            crop = this;
            // document.getElementById("icon2").src= this.cropper.getCroppedCanvas().toDataURL("image/png"); 
            
            // generatePreview();
        }
    });
    // cropper = new Cropper(document.getElementById('icon'), {
    //     autoCrop: true,
    //     autoCropArea: 1,
    //     aspectRatio: 500 / 660,
    //     minCropBoxWidth: 500,
    //     minCropBoxHeight: 660,
    //     viewMode: 2,
    //     ready: function() {
    //         // console.log(this.cropper.getCroppedCanvas());
    //         // document.getElementById("picParent").append(this.cropper.getCroppedCanvas())
    //         let newImg = this.cropper.getCroppedCanvas().toDataURL();
    //         document.getElementById("icon2").src = newImg;
    //         // console.log(newImg);
    //         document.getElementById("icon2").width = "1024px";
    //     }
    // });
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
