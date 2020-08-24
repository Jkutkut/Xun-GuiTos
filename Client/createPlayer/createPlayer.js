var loadFile = function(event) {
	var image = document.getElementById('icon');
    image.src = URL.createObjectURL(event.target.files[0]);
    image.style.width = "500px";
    image.style.height = "500px";

};