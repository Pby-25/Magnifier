function setScreenshotUrl(url) {
    document.getElementById('top_layer').src = url;
    document.getElementById("bottom_layer").style.background = "url('" + url + "') no-repeat";
};

function setMagnifyStr(strength){
    var magnifier = document.getElementById("bottom_layer");
    var magniSize = 200;
    magnifier.style.transform = "scale(" + strength + ")";
    //magnifier.style.width = Math.round(magniSize/strength) + "px";
    //magnifier.style.height = Math.round(magniSize/strength) + "px";
};

$(function(){

    //Now the mousemove function
    $(".magnify").mousemove(function(e){


        // Fade-in and fade-out the glass if the mouse is inside the page
        if(e.pageX < $(this).width() && e.pageY < $(this).height() && e.pageX > 0 && e.pageY > 0)
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
