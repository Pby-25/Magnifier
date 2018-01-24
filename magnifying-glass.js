chrome.runtime.onMessage.addListener(function transfer(config, sender){
    // Create new div for the magnifier
    $('body').after('<div class="_magnify_scope"><div id="_bottom_layer" tabindex="0"></div></div>');

    var imageUrl = config.snapshot_url;
    var strength = config.magnifier_str;
    var magniSize = config.magnifier_size;
    var magAA = config.magnifier_aa;
    // Remove the listener since it's no longer needed
    chrome.runtime.onMessage.removeListener(transfer);

    var magnifier = document.getElementById("_bottom_layer");
    if (magAA){
        magnifier.style.imageRendering = "auto";
    } else {
        magnifier.style.imageRendering = "pixelated";
    }
    magnifier.style.background = "url('" + imageUrl + "') no-repeat";
    magnifier.style.transform = "scale(" + strength + ")";
    magnifier.style.width = magniSize/strength + "px";
    magnifier.style.height = magniSize/strength + "px";
    magnifier.style.boxShadow = "0 0 0 " + 7/strength + "px rgba(255, 255, 255, 0.85), " +
        "0 0 " + 7/strength + "px " + 7/strength + "px rgba(0, 0, 0, 0.25), " +
        "inset 0 0 " + 40/strength + "px "+ 2/strength + "px rgba(0, 0, 0, 0.25)";

    $('._magnify_scope').mousemove(function(e){
        // Fade-in and fade-out the glass if the mouse is inside the page
        if(e.clientX < $(this).width()-1 && e.clientY < $(this).height()-4 && e.clientX > 0 && e.clientY > 0)
        {
            $('#_bottom_layer').fadeIn(100);
            // Focus the bottom layer to allow keypress events
            $('#_bottom_layer').focus();
        }
        else
        {
            $('#_bottom_layer').fadeOut(100);
        }

        if($('#_bottom_layer').is(':visible'))
        {
            // Calculate the relative position of large image
            var x_offset = Math.round(e.clientX - $('#_bottom_layer').width()/2)*-1;
            var y_offset = Math.round(e.clientY - $('#_bottom_layer').height()/2)*-1;
            var bg_position = x_offset + "px " + y_offset + "px";

            // Move the magnifying glass with the mouse
            var x_position = e.clientX - $('#_bottom_layer').width()/2;
            var y_position = e.clientY - $('#_bottom_layer').height()/2;

            $("#_bottom_layer").css({left: x_position, top: y_position, backgroundPosition: bg_position});
        };
    });

    // Turn off the application if the user's action imply they want to do so
    $('#_bottom_layer').on('wheel keydown click', function(e){
        $('._magnify_scope').remove();
    })
    

});