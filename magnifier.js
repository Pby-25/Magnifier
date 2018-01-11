function setScreenshotUrl(url) {
    document.getElementById('top_layer').src = url;
    document.getElementById("bottom_layer").style.background = "url('" + url + "') no-repeat";
};

function setMagnifyStr(strength){
    document.getElementById("bottom_layer").style.transform = "scale(" + strength + ")";
};

$(function(){
    var magnify_width = 0;
    var magnify_height = 0;
    var scale_factor = "";
    var magnify_str = 1;

    //Now the mousemove function
    $(".magnify").mousemove(function(e){
        if(!magnify_width && !magnify_height)
        {
            var img = document.getElementById("top_layer");
            // TODO customizable magnification
            magnify_width = img.width * magnify_str;
            magnify_height = img.height * magnify_str;
            scale_factor = $(".large").css("transform");
            magnify_str = +scale_factor.replace(/[^0-9.]/g, '');
        }
        else {
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
        };
    });
});
