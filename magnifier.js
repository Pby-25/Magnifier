// set the url of image to be magnified
function setScreenshotUrl(url) {
    document.getElementById("top_layer").src = url;
    document.getElementById("bottom_layer").style.background = "url('" + url + "') no-repeat";
};

// Set the magnifier's attributes according to user's preference
function setMagnifier(strength, magniSize){
    var magnifier = document.getElementById("bottom_layer");
    magnifier.style.transform = "scale(" + strength + ")";
    magnifier.style.width = magniSize/strength + "px";
    magnifier.style.height = magniSize/strength + "px";
    magnifier.style.boxShadow = "0 0 0 " + 7/strength + "px rgba(255, 255, 255, 0.85), " +
                                 "0 0 " + 7/strength + "px " + 7/strength + "px rgba(0, 0, 0, 0.25), " +
                                 "inset 0 0 " + 40/strength + "px "+ 2/strength + "px rgba(0, 0, 0, 0.25)"
};

// Adjust the magnifying glass based on cursor's position
$(function(){
    $(".magnify").mousemove(function(e){
        // Fade-in and fade-out the glass if the mouse is inside the page
        if(e.pageX < $(this).width()-1 && e.pageY < $(this).height()-4 && e.pageX > 0 && e.pageY > 0)
        {
            $(".large").fadeIn(100);
        }
        else
        {
            $(".large").fadeOut(100);
        }

        if($(".large").is(":visible"))
        {
            // Calculate the relative position of large image
            var x_offset = Math.round(e.pageX - $(".large").width()/2)*-1;
            var y_offset = Math.round(e.pageY - $(".large").height()/2)*-1;
            var bg_position = x_offset + "px " + y_offset + "px";

            // Move the magnifying glass with the mouse
            var x_position = e.pageX - $(".large").width()/2;
            var y_position = e.pageY - $(".large").height()/2;

            $(".large").css({left: x_position, top: y_position, backgroundPosition: bg_position});
        };
    });
});
