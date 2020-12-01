window.onload = function() {
    // find the element that you want to drag.
    var box = document.getElementById('box');
    
    /* listen to the touchMove event,
    every time it fires, grab the location
    of touch and assign it to box */
    
    box.addEventListener('touchmove', function(e) {
        // grab the location of touch
        var touchLocation = e.targetTouches[0];

        // assign box new coordinates based on the touch.
        let w = $("#box").css("width");
        let h = $("#box").css("height"); 
        w = parseFloat(h.substring(0, h.length - 2)) / 2;
        h = parseFloat(h.substring(0, h.length - 2)) / 2;
        box.style.left = (touchLocation.pageX - w) + 'px';
        box.style.top = (touchLocation.pageY - h) + 'px';
    })
    
    /* record the position of the touch
    when released using touchend event.
    This will be the drop position. */
    
    box.addEventListener('touchend', function(e) {
        // current box position.
        var x = parseInt(box.style.left);
        var y = parseInt(box.style.top);
    })
    
  }